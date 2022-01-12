import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventEmitter, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/shared/auth.service';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock:HttpTestingController;
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ProductService,{provide:AuthService,useClass:MockAuthServ}],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
