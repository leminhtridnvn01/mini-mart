export interface Order {
  cityId: number;
  storeId: number;
  orderType: number;
  pickupTimeFrom?: Date;
  pickupTimeTo?: Date;

  userName?: string;
  phoneNumber: string;
  address: string;
  note?: string;

  products: ProductForOrder[];
}

export interface ProductForOrder {
  productId: number;
  quantity: number;
}
