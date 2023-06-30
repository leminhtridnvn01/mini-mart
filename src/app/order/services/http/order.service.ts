import { UpdateOrderTypeRequest } from './../../models/update-order-type';
import { GetOrderRequest } from './../../models/get-order-request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/_enviroments/enviroment.prod';
import { Order, OrderParrent } from '../../models/order';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';
import { DataSourceResult } from 'src/app/shared/models';
import { UpdateDeliveryAddressOrderRequest } from '../../models/update-delevery-info';
import { UpdatePaymentMethodRequest } from '../../models/update-payment-method';
import { PaymentInfoRequest } from '../../models/payment-info';
import { OrderInfo } from '../../models/order-info';
import { OrderProcess } from '../../models/order-process';
import { UpdatePickupTimeRequest } from '../../models/update-pickup-time';
import { UpdateOrderStatusRequest } from '../../models/update-order-status';

@Injectable()
export class OrderService {
  private baseUrl = `${environment.webUrl}/api`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getOrders(request: GetOrderRequest): Observable<DataSourceResult<Order>> {
    const url = `${this.baseUrl}/Order`;
    let params = this.getParams(request);
    if (request?.orderStatus) {
      params = params.set('orderStatus', request?.orderStatus?.toString());
    }
    return this.http.get<DataSourceResult<Order>>(url, {
      params,
    });
  }

  getOrdersWaitingForPayment(
    request: GetOrderRequest
  ): Observable<OrderParrent[]> {
    const url = `${this.baseUrl}/Order/get-waiting-for-pay`;
    let params = this.getParams(request);
    if (request?.orderStatus) {
      params = params.set('orderStatus', request?.orderStatus?.toString());
    }
    return this.http.get<OrderParrent[]>(url, {
      params,
    });
  }

  updateDeliveryAddressOrder(
    request: UpdateDeliveryAddressOrderRequest
  ): Observable<boolean> {
    const url = `${this.baseUrl}/Order/edit-delivery-info`;
    return this.http.put<boolean>(url, request, this.httpOptions);
  }

  updateOrderType(request: UpdateOrderTypeRequest): Observable<boolean> {
    const url = `${this.baseUrl}/Order/edit-order-type`;
    return this.http.put<boolean>(url, request, this.httpOptions);
  }

  updateOrderStatus(request: UpdateOrderStatusRequest): Observable<boolean> {
    const url = `${this.baseUrl}/Order/update-order-status`;
    return this.http.put<boolean>(url, request, this.httpOptions);
  }

  updatePickupTime(request: UpdatePickupTimeRequest): Observable<boolean> {
    const url = `${this.baseUrl}/Order/edit-pickup-time`;
    return this.http.put<boolean>(url, request, this.httpOptions);
  }

  updatePaymentMethod(
    request: UpdatePaymentMethodRequest
  ): Observable<boolean> {
    const url = `${this.baseUrl}/Order/edit-payment-method`;
    return this.http.put<boolean>(url, request, this.httpOptions);
  }

  pay(request: OrderInfo): Observable<OrderProcess> {
    const url = `${this.baseUrl}/Order/process-order`;
    return this.http.post<OrderProcess>(url, request, this.httpOptions);
  }

  returnPay(
    vnp_Amount?: number,
    vnp_BankCode?: string,
    vnp_BankTranNo?: string,
    vnp_CardType?: string,
    vnp_OrderInfo?: string,
    vnp_PayDate?: string,
    vnp_ResponseCode?: string,
    vnp_TmnCode?: string,
    vnp_TransactionNo?: string,
    vnp_TransactionStatus?: string,
    vnp_TxnRef?: string,
    vnp_SecureHash?: string
  ): Observable<boolean> {
    const url = `${this.baseUrl}/Payment/return-pay`;
    let params = new HttpParams();

    if (vnp_Amount) {
      params = params.set('vnp_Amount', vnp_Amount.toString());
    }
    if (vnp_BankCode) {
      params = params.set('vnp_BankCode', vnp_BankCode);
    }
    if (vnp_BankTranNo) {
      params = params.set('vnp_BankTranNo', vnp_BankTranNo);
    }
    if (vnp_CardType) {
      params = params.set('vnp_CardType', vnp_CardType);
    }
    if (vnp_OrderInfo) {
      params = params.set('vnp_OrderInfo', vnp_OrderInfo);
    }
    if (vnp_PayDate) {
      params = params.set('vnp_PayDate', vnp_PayDate);
    }
    if (vnp_ResponseCode) {
      params = params.set('vnp_ResponseCode', vnp_ResponseCode);
    }
    if (vnp_TmnCode) {
      params = params.set('vnp_TmnCode', vnp_TmnCode);
    }
    if (vnp_TransactionNo) {
      params = params.set('vnp_TransactionNo', vnp_TransactionNo);
    }
    if (vnp_TransactionStatus) {
      params = params.set('vnp_TransactionStatus', vnp_TransactionStatus);
    }
    if (vnp_TxnRef) {
      params = params.set('vnp_TxnRef', vnp_TxnRef);
    }
    if (vnp_SecureHash) {
      params = params.set('vnp_SecureHash', vnp_SecureHash);
    }

    return this.http.post<boolean>(url, null, {
      params,
    });
  }

  private getParams(request?: IPagingRequest): HttpParams {
    let params = new HttpParams();
    if (request?.pageNo) {
      params = params.set('pageNo', request?.pageNo?.toString());
    }
    if (request?.pageSize) {
      params = params.set('pageSize', request?.pageSize?.toString());
    }
    return params;
  }
}
