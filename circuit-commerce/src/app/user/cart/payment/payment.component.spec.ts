import { EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ProductService } from 'src/app/shared/product.service';
import { UserService } from '../../shared/user.service';

import { PaymentComponent } from './payment.component';
import { PaymentService } from './payment.service';

describe('PaymentComponent', () => {
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
  }
  class MockProductClass{}
  class MockPaymentClass{}
  class MockUserService{}
  class MockAppDataLayerService{
    @Output() cartItemTotal=new EventEmitter<number>();
  }
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [PaymentComponent],
      providers:[
        {provide:AuthService,useClass:MockAuthServ},
        {provide:ProductService,useClass: MockProductClass},
        {provide:PaymentService,useClass:MockPaymentClass},
        {provide:AppDataLayerService,useClass:MockAppDataLayerService},
        {provide:UserService,useClass:MockUserService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
