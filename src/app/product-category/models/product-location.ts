export interface ProductLocation {
  cityId?: number;
  cityName?: string;
  stores: ProductStore[];
}

export interface ProductStore {
  cityId?: number;
  cityName?: string;
  storeId?: number;
  storeName?: string;
  adddress?: string;
  productId?: number;
  productName?: string;
  quantity?: number;
}
