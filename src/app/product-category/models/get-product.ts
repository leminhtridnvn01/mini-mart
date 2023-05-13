import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';

export interface GetProductResponse {
  id?: number;
  name?: string;
  description?: string;
  img?: string;
  price?: number;
  priceDecreases?: number;
  lK_ProductUnit?: LK_ProductUnit;
  categoryId?: number;
}

export interface GetProductRequest extends IPagingRequest {
  categoryId?: number;
}
