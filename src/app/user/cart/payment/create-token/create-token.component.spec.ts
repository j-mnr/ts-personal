import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { StripeService } from 'ngx-stripe';

import { CreateTokenComponent } from './create-token.component';

describe('CreateTokenComponent', () => {
  let component: CreateTokenComponent;
  let fixture: ComponentFixture<CreateTokenComponent>;

  class MockStripe{}
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTokenComponent],
      providers:[StripeService,FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
