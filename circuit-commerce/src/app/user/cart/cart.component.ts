import { Component, Input, OnInit } from '@angular/core';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ProductOrderComponent } from 'src/app/product/product-order/product-order.component';
import { IFullProduct } from 'src/app/product/product-response.payload';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  username: string = this.authService.getUsername();
  @Input() products$!: IFullProduct[];
  totalCartCost$: number = 0;
  cartCount$: number = 0;

  constructor(
    private authService: AuthService,
    private localProductService: AppDataLayerService
  ) {}

  ngOnInit() {
    this.products$ = this.localProductService.getLocalProducts();
    this.totalCartCost$ = this.calculateProductPriceTotal();
    this.localProductService.cartCostTotal.subscribe((resolve: number) => {
      this.totalCartCost$ = resolve;
    });
    this.localProductService.cartItemTotal.subscribe((resolve: number) => {
      this.cartCount$ = resolve;
    });
    if (this.localProductService.localProducts != null) {
      this.cartCount$ = this.localProductService.localProducts.length;
    }
  }

  async removeFromCart(cartItem: ProductOrderComponent) {
    this.localProductService.removeFromDataLayer(cartItem.product);
  }

  calculateProductPriceTotal(): number {
    let total = 0;
    if (this.products$ != null) {
      this.products$.forEach((element) => {
        total += element.price;
      });
    }
    return total;
  }

  async clearCart() {
    let statusCode = await this.localProductService.clearCart();
    if (statusCode == 204) {
      this.products$.length = 0;
      this.totalCartCost$ = 0;
      this.localProductService.resetCart();
    }
  }
}
