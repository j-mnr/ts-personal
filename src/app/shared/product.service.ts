import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/shared/auth.service';
import {
  IFullProduct,
  IUltraFullProduct,
} from '../product/product-response.payload';
import { ProductShortResponse } from '../product/product-short-response.payload';
import { UserOrderRequest } from '../user/orders/user-order-request.payload';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  username: string = this.authService.getUsername();
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  addToCart(id: number): void {
    this.httpClient
      .get(
        `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/user/cart/add?pid=${id}`,
        {
          headers: {
            username: this.username,
          },
        }
      )
      .subscribe(() => {});
  }

  removeFromCart(id: number): Observable<any> {
    return this.httpClient.delete(
      `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/user/cart?pid=${id}`,
      {
        headers: {
          username: this.username,
        },
      }
    );
  }

  makeOrder(productIds: UserOrderRequest): Observable<any> {
    return this.httpClient.post(
      `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/orders/add`,
        productIds,
    );
  }

  getProductCards(type: string): Observable<IFullProduct[]> {
    return this.httpClient.get<IFullProduct[]>(
      `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/${type}/all`
    );
  }

  getFullProduct(pid: number): Observable<IUltraFullProduct> {
    return this.httpClient.get<IUltraFullProduct>(
      `http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/product/id/${pid}`
    );
  }
}
