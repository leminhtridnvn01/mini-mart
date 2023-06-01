import { GetOrderRequest } from './../../models/get-order-request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/_enviroments/enviroment.prod';
import { Order } from '../../models/order';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';
import { DataSourceResult } from 'src/app/shared/models';

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
