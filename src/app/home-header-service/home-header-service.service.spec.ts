import { TestBed } from '@angular/core/testing';

import { HomeHeaderServiceService } from './home-header-service.service';

describe('HomeHeaderServiceService', () => {
  let service: HomeHeaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeHeaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
