import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ProductCarouselComponent } from './product/product-carousel/product-carousel.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CartComponent } from './user/cart/cart.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProductOrderComponent } from './product/product-order/product-order.component';
import { OrdersComponent } from './user/orders/orders.component';
import { PaymentComponent } from './user/cart/payment/payment.component';
import { SubtotalComponent } from './user/shared/subtotal/subtotal.component';
import { ProductReviewComponent } from './product/product-review/product-review.component';
import { NgxStripeModule } from 'ngx-stripe';
import { CreateTokenComponent } from './user/cart/payment/create-token/create-token.component';
import { TokenInterceptor } from './token-interceptor';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    ProductDetailsComponent,
    FooterComponent,
    HomeComponent,
    OrdersComponent,
    ProfileComponent,
    CartComponent,
    ProductCardComponent,
    ProductCarouselComponent,
    ProductOrderComponent,
    OrdersComponent,
    PaymentComponent,
    SubtotalComponent,
    ProductReviewComponent,
    CreateTokenComponent,
    EditProfileComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgxStripeModule.forRoot(
      'pk_test_51ICuTlGw3ngS8cEwccBTvBDwT0dqlbmkFmBNQ29Bq1TXaosoZbBTkA3zFqcwxDAdon8c6afzKSPU470K85Wp0g6p006J1Pl9Ig'
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
