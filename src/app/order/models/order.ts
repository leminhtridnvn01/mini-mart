import { ProductInCart } from 'src/app/cart/models/product-in-cart';

export interface Order {
  orderId: number;
  storeName: string;
  orderStatus: number;
  products: ProductInCart[];
}
