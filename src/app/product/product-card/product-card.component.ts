import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFullProduct } from '../product-response.payload';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() productCard!: IFullProduct;
  @Output() addToCart = new EventEmitter();

  constructor() {}

  addItemToCart(value: number) {
    this.addToCart.emit(value);
  }
}
