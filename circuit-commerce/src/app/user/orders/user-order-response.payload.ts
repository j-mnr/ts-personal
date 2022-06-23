import { IUltraFullProduct } from 'src/app/product/product-response.payload';

export interface UserOrderResponse {
  orderId: number;
  orderTime: number;
  orderStatus: string;
  receiptUrl: string;
  productList: IUltraFullProduct[];
}
