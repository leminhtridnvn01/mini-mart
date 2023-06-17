import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';
import { ProductLocation } from './product-location';

export interface GetProductResponse {
  id?: number;
  name?: string;
  description?: string;
  img?: string;
  price?: number;
  priceDecreases?: number;
  lK_ProductUnit?: LK_ProductUnit;
  categoryId?: number;
  locations: ProductLocation[];
  isValid: boolean;
  currentStorePriceDecreases?: number;
}

// export interface ProductStoreResponse {
//   cityId?: number;
//   cityName?: string;
//   storeId?: number;
//   storeName?: string;
//   adddress?: string;
//   productId?: number;
//   productName?: string;
//   quantity?: number;
// }

export interface GetProductRequest extends IPagingRequest {
  categoryId?: number;
  search?: string;
  isSale?: boolean;
}

export interface GetSaleProductResponse extends GetProductResponse {
  storeId?: number;
  storeName?: string;
}
