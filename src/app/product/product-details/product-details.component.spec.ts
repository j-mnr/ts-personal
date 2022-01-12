import { EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ProductService } from 'src/app/shared/product.service';
import { IUltraFullProduct } from '../product-response.payload';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  class MockProductService{
    getFullProduct(): Observable<IUltraFullProduct>{
      return new Observable();
    }
  }
  class MockAppDataLayerService{
    @Output() cartItemTotal=new EventEmitter<number>();
  }
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ProductDetailsComponent],
      providers:[
        {provide:ProductService,useClass: MockProductService},
        {provide:AppDataLayerService,useClass:MockAppDataLayerService},
        {provide:AuthService,useClass:MockAuthServ}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
