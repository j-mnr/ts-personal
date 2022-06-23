import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  private functionCallSource = new Subject<any>();

  functionCalled$ = this.functionCallSource.asObservable();

  searchCarousels(value: string) {
    this.functionCallSource.next(value);
  }
}
