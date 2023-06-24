import { ProductInCart } from 'src/app/cart/models/product-in-cart';

export interface Order {
  orderId: number;
  storeId: number;
  storeName: string;
  orderStatus: number;
  totalPrice: number;
  userName?: string;
  deliveryAddress?: string;
  contactPhoneNumber?: string;
  lk_orderStatus?: number;
  orderType?: number;
  paymentMethod?: number;
  pickupTimeFrom: Date;
  pickupTimeTo: Date;
  products: ProductInCart[];
}
