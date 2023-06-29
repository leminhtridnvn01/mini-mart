import { IPagingRequest } from 'src/app/shared/models/paging-request.model';

export interface GetProductManagerResponse {
  productId?: number;
  name?: string;
  description?: string;
  quantity?: number;
  originalPrice?: number;
  originalPriceDecreases?: number;
  currentPrice?: number;
  currentPriceDecreases?: number;
  categoryName: string;
  categoryId: number;
  lK_ProductUnit: number;
}

export interface GetProductManagerRequest extends IPagingRequest {
  storeId: number;
  search?: string;
}

export interface GetLocationManageStoreResponse {
  cityId: number;
  cityName: string;
  stores: GetStoreLocationResponse[];
}

export interface GetStoreLocationResponse {
  cityId: number;
  cityName: string;
  storeId: number;
  storeName: string;
  address: string;
}

export interface CreateProductToOrderRequest {
  name?: string;
  description?: string;
  img?: string;
  price?: number;
  priceDecreases?: number;
  lK_ProductUnit?: number;
  categoryId?: number;
  storeIds: number[];
}

export interface EditProductToOrderRequest {
  productId: number;
  name?: string;
  description?: string;
  img?: string;
  price?: number;
  priceDecreases?: number;
  lK_ProductUnit?: number;
  categoryId?: number;
  storeId: number;
  quantity?: number;
}
