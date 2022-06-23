import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { ProductService } from 'src/app/shared/product.service';
import { IFullProduct } from '../product-response.payload';
import { ProductShortResponse } from '../product-short-response.payload';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.css'],
})
export class ProductCarouselComponent implements OnInit, OnChanges {
  @Input() productTitle!: string;
  @Input() productEndpoint!: string;
  @Input() filterName!: string;

  toggleOn: boolean = true;
  fullProducts: IFullProduct[];
  shiftPixels = 0;
  shiftIndex = 0;
  cardWidth = 380;
  componentHeight = 450;
  maxIndex = 0;
  leftArrowOpacity = 0.5;
  rightArrowOpacity = 1.0;
  expanded = false;
  wrapType = 'nowrap';
  visibilityStatus = 'visible';
  alignCarousel = -40;

  fullProduct!: IFullProduct;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private localProductService: AppDataLayerService
  ) {
    this.fullProducts = [];
  }

  ngOnInit(): void {
    this.productService
      .getProductCards(this.productEndpoint)
      .subscribe((response) => {
        this.fullProducts = response;
        this.maxIndex = this.fullProducts.length - 4;
        if (this.maxIndex <= 0) {
          this.rightArrowOpacity = 0.5;
          this.visibilityStatus = 'hidden';
        } else {
          this.visibilityStatus = 'visible';
          this.rightArrowOpacity = 1.0;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let filterProducts: ProductShortResponse[] = [];
    this.fullProducts.forEach((product) => {
      if (
        product.abbreviatedTitle
          .toLowerCase()
          .includes(this.filterName.toLowerCase())
      ) {
        filterProducts.push(product);
      }
      (document.getElementById(
        product.productId.toString()
      ) as HTMLElement).style.display = 'none';
    });

    filterProducts.forEach((product) => {
      (document.getElementById(
        product.productId.toString()
      ) as HTMLElement).style.display = 'grid';
    });
  }

  addToCart(id: number): void {
    const isLoggedIn: boolean = this.authService.getUsername() != null;
    this.productService.getFullProduct(id).subscribe((res: any) => {
      this.fullProduct = res;
      if (isLoggedIn && this.fullProduct != null) {
        let productData: IFullProduct = this.fullProduct;
        this.localProductService.addToDataLayer(productData);
      }
    });
  }

  shiftRight() {
    let maxShift = this.maxIndex - this.shiftIndex;
    if (maxShift > 4) maxShift = 4;
    if (maxShift >= 0) {
      if (this.maxIndex - maxShift > 0) this.leftArrowOpacity = 1.0;
      this.shiftPixels -= this.cardWidth * maxShift;
      this.shiftIndex += maxShift;
    }
    if (this.maxIndex - this.shiftIndex <= 0) {
      this.rightArrowOpacity = 0.5;
    }
  }

  shiftLeft() {
    let maxShift;
    if (this.shiftIndex >= 4) {
      maxShift = 4;
    } else maxShift = this.shiftIndex;
    if (maxShift > 0) {
      this.rightArrowOpacity = 1.0;
      this.shiftPixels += this.cardWidth * maxShift;
      this.shiftIndex -= maxShift;
    }
    if (this.shiftIndex <= 0) this.leftArrowOpacity = 0.5;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.componentHeight += Math.ceil(this.fullProducts.length / 4) * 250;
      this.wrapType = 'wrap';
      this.alignCarousel = 28;
    } else {
      this.componentHeight = 450;
      this.alignCarousel = -40;
      this.wrapType = 'nowrap';
    }
  }
}
