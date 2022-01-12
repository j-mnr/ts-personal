import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeHeaderServiceService {
  constructor() {}

  private functionCallSource = new Subject<any>();

  functionCalled$ = this.functionCallSource.asObservable();

  updateCarousels(value: string) {
    this.functionCallSource.next(value);
  }
}
