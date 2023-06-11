export interface PaymentInfoRequest {
  orderId: number;
  amount: number;
  orderDesc: string;
  language: number;
  bank: number;
  orderCategory: number;

  billingMobile: string;
  billingEmail: string;
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingCity: string;
  billingCountry: string;

  shippingMobile: string;
  shippingEmail: string;
  shippingCustomer: string;
  shippingAddress: string;
  shippingCompany: string;
  shippingTaxCode: string;
  shippingBillType: number;
}
