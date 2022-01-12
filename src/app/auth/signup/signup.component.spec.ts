import { EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../shared/auth.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
  }
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [SignupComponent],
      providers:[
        {provide:AuthService,useClass:MockAuthServ},
        FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
