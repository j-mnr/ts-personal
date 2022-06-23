import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { IFullProduct } from 'src/app/product/product-response.payload';
import { UserOrderResponse } from './user-order-response.payload';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  username: string = this.authService.getUsername();
  orders$!: IFullProduct[];
  @Input() productOrders$!: Observable<UserOrderResponse[]>;
  totalOrderInstances: number = 0;

  // TODO wire this to backend to grab all orders for user
  constructor(
    private localProductData: AppDataLayerService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.productOrders$ = this.localProductData.getPreviousOrders();
    this.productOrders$.subscribe((response) => {
      this.totalOrderInstances = response.length;
    });
  }
}
