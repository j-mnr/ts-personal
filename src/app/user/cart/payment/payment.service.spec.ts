import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventEmitter, Output } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/auth/shared/auth.service';

import { PaymentService } from './payment.service';

describe('PaymentService', () => {
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
  }
  let service: PaymentService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[
        {provide:AuthService,useClass:MockAuthServ}
      ]
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
