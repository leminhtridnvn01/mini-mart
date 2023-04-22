import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment.prod';
import { GetAllCategoriesResponse } from '../models/GetAllCategoriesResponse';
import { DataSourceResult } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { GetAllCategoriesRequest } from '../models/GetAllCategoriesRequest';

@Injectable()
export class ProductCategoryService {
  private baseUrl = `${environment.webUrl}/api/Category`;
  constructor(private http: HttpClient) {}

  getAllCategories(
    request?: GetAllCategoriesRequest
  ): Observable<DataSourceResult<GetAllCategoriesResponse>> {
    const url = `${this.baseUrl}`;
    let params = this.getParams(request);
    return this.http.get<DataSourceResult<GetAllCategoriesResponse>>(url, {
      params,
    });
  }

  private getParams(request?: GetAllCategoriesRequest): HttpParams {
    let params = new HttpParams();
    if (request?.pageNo) {
      params.set('pageNo', request?.pageNo?.toString());
    }
    if (request?.pageSize) {
      params.set('pageSize', request?.pageSize?.toString());
    }
    return params;
  }
}
