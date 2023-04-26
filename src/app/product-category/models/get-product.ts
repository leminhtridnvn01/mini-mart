import { IPagingRequest } from 'src/app/shared/models/paging-request.model';

export interface GetProductResponse {
  id?: number;
  name?: string;
  description?: string;
  img?: string;
  price?: number;
  priceDecreases?: number;
  lK_ProductUnit?: number;
  categoryId?: number;
}

export interface GetProductRequest extends IPagingRequest {
  categoryId?: number;
}
