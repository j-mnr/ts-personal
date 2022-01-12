import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IFullProduct } from '../product-response.payload';

import { ProductOrderComponent } from './product-order.component';

describe('ProductOrderComponent', () => {
  let component: ProductOrderComponent;
  let fixture: ComponentFixture<ProductOrderComponent>;
  const testPro:IFullProduct={
  abbreviatedTitle:"",
  brand:"",
  carts: [],
  description:"",
  modelNumber:"",
  owningOrder:0,
  price:0,
  productId:0,
  reviewList: [],
  title:""
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductOrderComponent],
    }).compileComponents();
   
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
