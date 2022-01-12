import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Output, EventEmitter} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { AuthGuard } from './auth.guard';
import { AuthService } from './shared/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let httpMock:HttpTestingController;
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      
      imports:[HttpClientTestingModule,RouterTestingModule], 
      providers:[{provide:AuthService,useClass:MockAuthServ}],

    });
    guard = TestBed.inject(AuthGuard);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
