import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/_enviroments/enviroment.prod';
import { GetLocationManageStoreResponse } from 'src/app/managers/product-management/models';
import {
  GetRenueveRequest,
  GetRenueveResponse,
} from '../../models/renueve.model';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';

@Injectable()
export class RevenueManagementService {
  private baseUrl = `${environment.webUrl}/api`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMyStoreLocations(): Observable<GetLocationManageStoreResponse[]> {
    const url = `${this.baseUrl}/Store/get-store-manager`;
    return this.http.get<GetLocationManageStoreResponse[]>(url);
  }

  getRevenueOrder(request: GetRenueveRequest): Observable<GetRenueveResponse> {
    const url = `${this.baseUrl}/Store/get-revenue`;
    let params = this.getParams(request);
    params = params.set('storeId', request.storeId);
    params = params.set('startDate', request.startDate.toLocaleString());
    params = params.set('endDate', request.endDate.toLocaleString());
    return this.http.get<GetRenueveResponse>(url, { params });
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
