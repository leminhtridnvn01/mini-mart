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
  address?: string;
  productId?: number;
  productName?: string;
  price?: number;
  priceDecreases?: number;
  quantity?: number;
}
