enum STATE {
  FULFILLED,
  REJECTED,
  PENDING,
};

export default class MyPromise<T> {
  private thenCbs: Function[] = [];
  private catchCbs: Function[] = [];
  private state = STATE.PENDING;
  private value: T;
  private onSuccessBind = this.onSuccess.bind(this);
  private onFailBind = this.onFail.bind(this);

  constructor(cb: Function) {
    try {
      cb(this.onSuccessBind, this.onFailBind)
    } catch (e) {
      this.onFail(e)
    }
  }

  private runCallbacks(): void {
    if (this.state == STATE.FULFILLED) {
      this.thenCbs.forEach(cb => cb(this.value))
      this.thenCbs = [];
    }
    if (this.state == STATE.REJECTED) {
      this.catchCbs.forEach(cb => cb(this.value))
      this.catchCbs = [];
    }
  }

  private onSuccess(value: T): void {
    queueMicrotask(() => {
      if (this.state !== STATE.PENDING)
        return;

      if (value instanceof MyPromise) {
        value.then(this.onSuccessBind, this.onFailBind);
        return;
      }

      this.value = value;
      this.state = STATE.FULFILLED;
      this.runCallbacks();
    });
  }

  private onFail(value: T): void {
    queueMicrotask(() => {
      if (this.state !== STATE.PENDING)
        return;

      if (value instanceof MyPromise) {
        value.then(this.onSuccessBind, this.onFailBind);
        return;
      }

      if (this.catchCbs.length === 0) {
        throw new UncaughtPromiseError((value as unknown) as Error);
      }

      this.value = value;
      this.state = STATE.REJECTED;
      this.runCallbacks();
    });
  }

  then(thenCb: Function, catchCb: Function): MyPromise<T> {
    return new MyPromise((resolve, reject) => {
      this.thenCbs.push((result: unknown) => {
        if (thenCb == null) {
          resolve(result);
          return;
        }
        try {
          resolve(thenCb(result));
        } catch (error) {
          reject(error);
        }
      });

      this.catchCbs.push((result: unknown) => {
        if (catchCb == null) {
          reject(result);
          return;
        }
        try {
          resolve(catchCb(result));
        } catch (error) {
          reject(error);
        }
      });
      this.runCallbacks();
    });
  }

  catch(cb: Function): MyPromise<T> {
    return this.then(undefined, cb);
  }

  finally(cb: Function): MyPromise<T> {
    return this.then((result: unknown) => {
      cb()
      return result;
    }, (result: Error) => {
      cb()
      throw result;
    });
  }

  static resolve(value: unknown): Promise<unknown> {
    return new Promise(resolve => resolve(value));
  }

  static reject(value: unknown): Promise<unknown> {
    return new Promise((_, reject) => reject(value));
  }

  static all(promises: MyPromise<unknown>[]) {
    const results = [];
    let completedPromises = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((p: MyPromise<unknown>, i) => {
        p.then((val: unknown) => {
          completedPromises++;
          results[i] = val;
          if (completedPromises === promises.length) {
            resolve(results);
          }
        }, undefined).catch(reject);
      });
    });
  }

  static allSettled(promise) {
  }
}

class UncaughtPromiseError extends Error {
  constructor(error: Error) {
    super(error.message)
    this.stack = `(in promise) ${error.stack}`
  }
}

// const p = new Promise(cb)
// p.then(() => {}).catch(() => {})
