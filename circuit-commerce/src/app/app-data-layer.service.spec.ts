import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-webstorage';

import { AppDataLayerService } from './app-data-layer.service';
import { AuthService } from './auth/shared/auth.service';

describe('AppDataLayerService', () => {
  let service: AppDataLayerService;
  let httpMock:HttpTestingController;
  class MockService{
    store(){}
    retrieve(){}
    clear(){}
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthService,{provide:LocalStorageService,useClass:MockService}],
    });
    service = TestBed.inject(AppDataLayerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
