import { IPagingRequest } from 'src/app/shared/models/paging-request.model';
export interface GetStrategyResponse {
  name?: string;
  description?: string;
  percentageDecrease?: number;
  activatedDateFrom?: Date;
  activatedDateTo?: Date;
  lK_ActivatedStrategyStatus?: number;
  products: GetStrategyProductResponse[];
}

export interface GetStrategyProductResponse {
  productId: number;
  productName?: string;
  description?: string;
  storeId: number;
  storeName?: string;
  percentageDecrease?: number;
  originalPrice?: number;
  originalPriceDecreases?: number;
  currentPrice?: number;
  currentPriceDecreases?: number;
}

export interface GetStrategyRequest extends IPagingRequest {
  startDate: Date;
  endDate: Date;
}

export interface AddStrategyRequest {
  name?: string;
  description?: string;
  percentageDecreases?: number;
  activatedDateFrom?: Date;
  activatedDateTo?: Date;
  products: AddProductStrategy[];
}

export interface AddProductStrategy {
  productId: number;
  storeId: number;
  percentageDecreases?: number;
}
