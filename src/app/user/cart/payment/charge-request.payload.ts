export interface ChargeRequest {
  description: string;
  amount: number;
  currency: Currency;
  email: string;
  stripeToken?: string;
}

export enum Currency {
  EUR,
  USD,
}
