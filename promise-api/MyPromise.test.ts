import "./MyPromise";
import MyPromise from "./MyPromise";

const DEFAULT_VALUE = "default"

describe("then", () => {
  it("with no chaining", () =>
    promise().then(v => expect(v).toEqual(DEFAULT_VALUE))
  );
  it("with multiple thens for same promise", () => {
    const checkFunc = v => expect(v).toEqual(DEFAULT_VALUE);
    const mainPromise = promise();
    const p1 = mainPromise.then(checkFunc);
    const p2 = mainPromise.then(checkFunc);
    return Promise.allSettled([p1, p2]);
  });
  it("with then and catch", () => {
    const checkFunc = v => expect(v).toEqual(DEFAULT_VALUE);
    const failFunc = v => expect(1).toEqual(2);
    const resolvePromise = promise().then(checkFunc, failFunc);
    const rejectPromise = promise({ fail: true }).then(failFunc, checkFunc)
    return Promise.allSettled([resolvePromise, rejectPromise]);
  });
  it("with chaining", () => {
    return promise({ value: 3 })
      .then((v: number) => v * 4)
      .then((v: number) => expect(v).toEqual(12));
  });
});

interface TestCase {
  value: unknown;
  fail: boolean;
}

function promise({ value = DEFAULT_VALUE, fail = false }: Partial<TestCase> = {}) {
  return new MyPromise((resolve, reject) => {
    fail ? reject(value) : resolve(value)
  });
}
