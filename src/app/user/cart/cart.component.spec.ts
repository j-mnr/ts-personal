import { EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { IFullProduct } from 'src/app/product/product-response.payload';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
  }
  class MockAppDataLayerService{
    
    @Output() cartItemTotal=new EventEmitter<number>();
    @Output() cartCostTotal=new EventEmitter<number>();
    getLocalProducts(){
      let localProducts:IFullProduct[]=[];
      return localProducts;
    }

  }
  class MockProductClass{}
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers:[
        {provide:AuthService,useClass:MockAuthServ},
        {provide:AppDataLayerService,useClass:MockAppDataLayerService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
