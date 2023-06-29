import { IPagingRequest } from 'src/app/shared/models/paging-request.model';
import { PagingResult } from 'src/app/shared/models/paging-result.model';

export interface GetRenueveResponse {
  totalRenueve: number;
  renueveOrders: PagingResult;
}

export interface GetRenueveOrderResponse {
  orderId: number;
  originalPrice?: number;
  priceDecreases?: number;
  deliveryFee?: number;
  totalPrice?: number;
  lK_OrderStatus?: number;
  lK_PaymentMethod?: number;
  lK_OrderType?: number;
  userName?: string;
  phoneNumber?: string;
  deliveryAddress?: string;
  createdOn?: Date;
}

export interface GetRenueveRequest extends IPagingRequest {
  storeId: number;
  startDate: Date;
  endDate: Date;
}
