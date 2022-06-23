import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFullProduct } from '../product-response.payload';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css'],
})
export class ProductOrderComponent {
  @Input() index!: number;
  @Input() product!: IFullProduct;
  @Input() showButton!: boolean;
  @Output()
  removeFromCart: EventEmitter<ProductOrderComponent> = new EventEmitter();
}
