import { IPagingRequest } from 'src/app/shared/models/paging-request.model';

export interface GetOrderRequest extends IPagingRequest {
  orderStatus?: number;
}

export interface GetManagerOrderRequest extends IPagingRequest {
  orderStatus?: number;
  storeId: number;
}
