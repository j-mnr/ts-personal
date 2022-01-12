import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ProductService } from 'src/app/shared/product.service';
import { IFullProduct, IUltraFullProduct } from '../product-response.payload';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() fullProduct!: IUltraFullProduct;
  @Input() productId: number;
  @Input() detailEntries;
  @Input() productTitle = '';
  @Input() brand = '';
  @Input() modelNumber = '';
  brandURL!: string;
  productURL!: string;
  private url: string = 'https://circuit-commerce-assets.s3.amazonaws.com/';

  constructor(
    // private route: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private localProductService: AppDataLayerService,
    private authService: AuthService
  ) {
    this.productId = this.route.snapshot.params.id;
    this.detailEntries = new Map();
  }

  ngOnInit(): void {
    this.productService
      .getFullProduct(this.productId)
      .subscribe((response: any) => {
        this.fullProduct = response;
        for (let detail in response) {
          if (response[detail] != '') {
            if (detail == 'title') {
              this.productTitle = response[detail];
            } else if (
              detail != 'abbreviatedTitle' &&
              detail != 'productId' &&
              detail != 'price'
            ) {
              if (detail == 'brand') {
                this.brand = response[detail];
                this.brandURL = this.url + this.brand + '.png';
              }
              if (detail == 'modelNumber') {
                this.modelNumber = response[detail];
                this.productURL = this.url + this.modelNumber + '.png';
              }
              let lineDetail = this.convertProductDetail(detail);
              this.detailEntries.set(lineDetail, response[detail]);
            }
          }
        }
      });
  }

  addToCart(id: number): void {
    const isLoggedIn: boolean = this.authService.getUsername() != null;
    if (isLoggedIn && this.fullProduct != null) {
      let productData: IFullProduct;
      productData = this.fullProduct;
      this.localProductService.addToDataLayer(productData);
    }
  }

  //my sad dungeon, no looking at my secret shame please. No time for algo
  convertProductDetail(detail: string): string {
    let productDetail: string;
    switch (detail) {
      case 'modelNumber':
        productDetail = 'Model Number';
        break;
      case 'brand':
        productDetail = 'Brand';
        break;
      case 'series':
        productDetail = 'Series';
        break;
      case 'l3Cache':
        productDetail = 'L3 Cache';
        break;
      case 'l2Cache':
        productDetail = 'L2 Cache';
        break;
      case 'coolingDevice':
        productDetail = 'Cooling Device';
        break;
      case 'manufacturingTech':
        productDetail = 'Manufacturing Tech';
        break;
      case 'motherboardCompatibility':
        productDetail = 'Motherboard Compatibility';
        break;
      case 'frontPorts':
        productDetail = 'Front Ports';
        break;
      case 'powerSupplyMounted':
        productDetail = 'Power Supply Mounted';
        break;
      case 'sidePannelWindow':
        productDetail = 'Side Panel Window';
        break;
      case 'fans':
        productDetail = 'Fans';
        break;
      case 'coreClock':
        productDetail = 'Core Clock';
        break;
      case 'maxResolution':
        productDetail = 'Max Resolution';
        break;
      case 'displayPort':
        productDetail = 'Display Port';
        break;
      case 'dvi':
        productDetail = 'DVI';
        break;
      case 'hdmi':
        productDetail = 'HDMI';
        break;
      case 'cardDimensions':
        productDetail = 'Card Dimensions';
        break;
      case 'caseLatency':
        productDetail = 'Case Latency';
        break;
      case 'voltage':
        productDetail = 'Voltage';
        break;
      case 'multiChannelKit':
        productDetail = 'Multi-Channel Kit';
        break;
      case 'timing':
        productDetail = 'Timing';
        break;
      case 'maxSeqRead':
        productDetail = 'Max Sequence Read';
        break;
      case 'maxSeqWrite':
        productDetail = 'Max Sequence Write';
        break;
      case 'usedFor':
        productDetail = 'User For';
        break;
      case 'mttf':
        productDetail = 'MTTF';
        break;
      case 'kb4RandomRead':
        productDetail = 'KB4 Random Read';
        break;
      case 'kb4RandomWrite':
        productDetail = 'KB4 Random Write';
        break;
      case 'controller':
        productDetail = 'Controller';
        break;
      case 'mainConnector':
        productDetail = 'Main Connector';
        break;
      case 'rails':
        productDetail = 'Rails';
        break;
      case 'pciExpressConnector':
        productDetail = 'PCI Express Connector';
        break;
      case 'height':
        productDetail = 'Height';
        break;
      case 'width':
        productDetail = 'Width';
        break;
      case 'length':
        productDetail = 'Length';
        break;
      case 'weight':
        productDetail = 'Weight';
        break;
      case 'packageContents':
        productDetail = 'Package Contents';
        break;
      case 'avereageLatency':
        productDetail = 'Average Latency';
        break;
      case 'memoryStandard':
        productDetail = 'Memory Standard';
        break;
      case 'numOfMemorySlots':
        productDetail = 'Number of Memory Slots';
        break;
      case 'audioChipset':
        productDetail = 'Audio Chipset';
        break;
      case 'onboardVideoChipset':
        productDetail = 'Onboard Video Chipset';
        break;
      case 'pciExpress':
        productDetail = 'PCI Express';
        break;
      default:
        productDetail = detail;
        break;
    }
    return productDetail;
  }
}
