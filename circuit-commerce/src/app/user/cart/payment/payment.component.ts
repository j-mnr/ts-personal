import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { IFullProduct } from 'src/app/product/product-response.payload';
import { ProductService } from 'src/app/shared/product.service';
import { UserOrderRequest } from '../../orders/user-order-request.payload';
import { UserService } from '../../shared/user.service';
import { UserResponse } from '../../user-response.payload';
import { ChargeRequest, Currency } from './charge-request.payload';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  products!: IFullProduct[];
  chargeRequest!: ChargeRequest;
  order!: UserOrderRequest;
  cartItemTotal!: number;
  user$!: Observable<UserResponse>;

  constructor(
    private paymentService: PaymentService,
    private productService: ProductService,
    private authService: AuthService,
    private userService: UserService,
    private appDal: AppDataLayerService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.products = await this.appDal.getAllInCart().toPromise();
    this.cartItemTotal = this.appDal.localProducts.length;
    this.user$ = this.userService.getUser(this.authService.getUsername());
    this.chargeRequest = {
      amount: 0,
      description: '',
      currency: Currency.USD,
      email: '',
    };
  }

  charge(stripeToken: string): any {
    this.loadRequest(stripeToken);
    this.order = {
      username: this.authService.getUsername(),
      chargeRequest: this.chargeRequest,
      productIdList: this.products.map((p) => p.productId),
      orderStatus: 'PENDING',
    };
    this.productService.makeOrder(this.order).subscribe(
      (data) => {},
      (err) => {
        throwError(err);
      }
    );
    this.appDal.clearCart();
    this.router.navigateByUrl('/');
  }

  loadRequest(stripeToken: string): void {
    this.chargeRequest.stripeToken = stripeToken;
    this.chargeRequest.currency = Currency.USD;
    this.chargeRequest.email = 'testemail@email.com';
    this.products.forEach((p) => {
      this.chargeRequest.description += this.toProductString(p);
      this.chargeRequest.amount += p.price;
    });
    this.chargeRequest.amount = Math.floor((this.chargeRequest.amount *= 100));
  }

  private toProductString(product: IFullProduct): string {
    return `Purchased:\n${product.modelNumber} ${product.title}\n ${product.brand}\n ${product.price}\n\n`;
  }
}
