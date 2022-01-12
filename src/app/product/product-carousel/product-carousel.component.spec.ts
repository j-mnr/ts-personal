import { EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ProductService } from 'src/app/shared/product.service';
import { IUltraFullProduct } from '../product-response.payload';
import { ProductShortResponse } from '../product-short-response.payload';

import { ProductCarouselComponent } from './product-carousel.component';

describe('ProductCarouselComponent', () => {
  class MockProductService{
    getFullProduct(): Observable<IUltraFullProduct>{
      return new Observable();
      
    }
    getProductCards(): Observable<ProductShortResponse[]>{
      return new Observable()
    }
  }
  class MockAppDataLayerService{
    @Output() cartItemTotal=new EventEmitter<number>();
    getAllInCart (){}

  }
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
   
  }
  let component: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ProductCarouselComponent],
      providers:[
        {provide:AuthService,useClass:MockAuthServ},
        {provide:ProductService,useClass: MockProductService},
        {provide:AppDataLayerService,useClass:MockAppDataLayerService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
