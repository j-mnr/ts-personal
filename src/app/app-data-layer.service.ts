import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { IFullProduct } from './product/product-response.payload';

@Injectable({
  providedIn: 'root',
})
export class AppDataLayerService {
  localProducts!: IFullProduct[];
  orderedProducts?: IFullProduct[];
  username = this.localStore.retrieve('username');
  @Output() cartItemTotal: EventEmitter<number> = new EventEmitter();
  @Output() cartCostTotal: EventEmitter<number> = new EventEmitter();
  addCartStatus?: number;

  constructor(
    private httpClient: HttpClient,
    private localStore: LocalStorageService
  ) {
    this.localProducts = this.localStore.retrieve('cart');
    if (this.username && this.localProducts) {
      this.calculateProductPriceTotal();
      this.cartItemTotal.emit(this.localProducts.length ?? 0);
    }
  }

  calculateProductPriceTotal(): number {
    let total = 0;
    if (this.localProducts != null) {
      this.localProducts.forEach((element) => {
        total += element.price;
      });
    }
    this.cartCostTotal.emit(total);
    return total;
  }

  getLocalProducts() {
    return this.localStore.retrieve('cart');
  }

  getPreviousOrders(): Observable<any> {
    return this.httpClient.get<any>(
      `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/orders/all/${this.username}`
    );
  }

  //populate from BE cart on user login
  loadUserProducts(): void {
    this.getAllInCart().subscribe((response) => {
      this.localProducts = response;
      this.localStore.store('cart', response);
      this.cartItemTotal.emit(this.localProducts.length);
    });
  }

  flushUserProducts(): void {
    this.localStore.clear('cart');
    this.cartItemTotal.emit(0);
  }

  resetCart() {
    this.localProducts.length = 0;
    this.localStore.store('cart', this.localProducts);
    this.cartItemTotal.emit(0);
  }

  getAllInCart(): Observable<IFullProduct[]> {
    return this.httpClient.get<IFullProduct[]>(
      `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/user/cart`,
      {
        headers: {
          username: this.username,
        },
      }
    );
  }

  async addToDataLayer(product: IFullProduct) {
    let statusCode = <number>await this.addToCart(product.productId);
    if (statusCode == 200) {
      if (
        this.localStore.retrieve('cart') == undefined ||
        this.localStore.retrieve('cart') == null
      ) {
        this.localProducts?.push(product);
        this.localStore.store('cart', this.localProducts);
      } else {
        this.localProducts = this.localStore.retrieve('cart');
        this.localProducts?.push(product);
        this.localStore.store('cart', this.localProducts);
      }
      this.calculateProductPriceTotal();
      this.cartItemTotal.emit(this.localProducts.length);
    }
  }

  async removeFromDataLayer(product: IFullProduct) {
    let responseCode = await this.removeFromCart(product.productId);
    if (responseCode == 204) {
      this.localProducts = this.localStore.retrieve('cart');
      if (this.localProducts != null) {
        let index = this.localProducts?.indexOf(product);
        if (index != -1) {
          this.localProducts.splice(index, 1);
          this.localStore.store('cart', this.localProducts);
          this.calculateProductPriceTotal();
          this.cartItemTotal.emit(this.localProducts.length);
        }
      }
    }
  }

  addToCart(id: number): Promise<number> {
    return new Promise((resolve) => {
      this.httpClient
        .get(
          `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/user/cart/add?pid=${id}`,
          {
            headers: {
              username: this.username,
            },
            observe: 'response',
            responseType: 'text',
          }
        )
        .subscribe((response) => {
          resolve(response.status);
        });
    });
  }

  removeFromCart(id: number): Promise<number> {
    return new Promise((resolve) => {
      this.httpClient
        .delete(
          `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/user/cart?pid=${id}`,
          {
            headers: {
              username: this.username,
            },
            observe: 'response',
            responseType: 'text',
          }
        )
        .subscribe((response) => {
          resolve(response.status);
        });
    });
  }

  clearCart(): Promise<number> {
    return new Promise((resolve) => {
      this.httpClient
        .delete(
          `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/user/cart/clear`,
          {
            headers: {
              username: this.username,
            },
            observe: 'response',
            responseType: 'text',
          }
        )
        .subscribe((response) => {
          if (response.status == 204) {
            this.resetCart();
            resolve(response.status);
          }
        });
    });
  }
}
