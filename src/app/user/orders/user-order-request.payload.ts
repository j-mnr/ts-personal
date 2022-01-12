import { ChargeRequest } from "../cart/payment/charge-request.payload";

export interface UserOrderRequest {
  username: string;
  chargeRequest?: ChargeRequest;
  productIdList: number[];
  orderStatus?: string;
}