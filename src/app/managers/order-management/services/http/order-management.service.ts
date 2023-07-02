import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/_enviroments/enviroment.prod';
import { GetLocationManageStoreResponse } from 'src/app/managers/product-management/models';
import {
  GetManagerOrderRequest,
  GetOrderRequest,
} from 'src/app/order/models/get-order-request';
import { Order } from 'src/app/order/models/order';
import { DataSourceResult } from 'src/app/shared/models';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';

@Injectable()
export class OrderManagementService {
  private baseUrl = `${environment.webUrl}/api`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMyStoreLocations(): Observable<GetLocationManageStoreResponse[]> {
    const url = `${this.baseUrl}/Store/get-store-manager`;
    return this.http.get<GetLocationManageStoreResponse[]>(url);
  }

  getManagerOrders(
    request: GetManagerOrderRequest
  ): Observable<DataSourceResult<Order>> {
    const url = `${this.baseUrl}/Order/get-manage-order`;
    let params = this.getParams(request);
    if (request?.orderStatus) {
      params = params.set('orderStatus', request?.orderStatus?.toString());
    }
    if (request?.storeId) {
      params = params.set('storeId', request?.storeId?.toString());
    }
    return this.http.get<DataSourceResult<Order>>(url, {
      params,
    });
  }

  approveOrder(orderId: number): Observable<boolean> {
    const url = `${this.baseUrl}/Order/approve-order/${orderId}`;
    return this.http.get<boolean>(url);
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
