import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UpdatePasswordComponent } from './auth/update-password/update-password.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { CartComponent } from './user/cart/cart.component';
import { PaymentComponent } from './user/cart/payment/payment.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/:username/update-password/:token', component: UpdatePasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  {
    path: 'user/:username',
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
