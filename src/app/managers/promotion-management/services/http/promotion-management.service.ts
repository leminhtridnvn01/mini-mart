import {
  AddStrategyRequest,
  GetStrategyRequest,
  GetStrategyResponse,
} from './../../models/strategy.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/_enviroments/enviroment.prod';
import { DataSourceResult } from 'src/app/shared/models';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';

@Injectable()
export class PromotionManagementService {
  private baseUrl = `${environment.webUrl}/api`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getManagerStrategy(
    request: GetStrategyRequest
  ): Observable<DataSourceResult<GetStrategyResponse>> {
    const url = `${this.baseUrl}/Strategy/get-manager-strategy`;
    let params = this.getParams(request);
    params = params.set('startDate', request.startDate.toLocaleString());
    params = params.set('endDate', request.endDate.toLocaleString());
    return this.http.get<DataSourceResult<GetStrategyResponse>>(url, {
      params,
    });
  }

  addStrategy(request: AddStrategyRequest): Observable<boolean> {
    const url = `${this.baseUrl}/Strategy/add-strategy`;
    return this.http.post<boolean>(url, request);
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
