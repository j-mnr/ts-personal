import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/shared/auth.service';
import { HomeHeaderServiceService } from '../home-header-service/home-header-service.service';

import { EventEmitter, Output} from '@angular/core';
import { AppDataLayerService } from '../app-data-layer.service';

describe('HeaderComponent', () => {
  class MockAuthServ{
    @Output() loggedIn=new EventEmitter<boolean>();
    @Output() username=new EventEmitter<boolean>();
    isLoggedIn(){}
    getUsername(){}
  }
  class Mockhhss{

  }
  class MockAppDataLayerService{
    @Output() cartItemTotal=new EventEmitter<number>();
  }
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [HeaderComponent],
      providers:[
        {provide:AuthService,useClass:MockAuthServ},
        {provide:HomeHeaderServiceService,useClass:Mockhhss},
        {provide:AppDataLayerService,useClass:MockAppDataLayerService}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
