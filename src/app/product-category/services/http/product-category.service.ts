import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroments/enviroment.prod';
import { GetCategoryResponse } from '../../models/GetAllCategories';
import { DataSourceResult } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { GetAllCategoriesRequest } from '../../models/GetAllCategories';
import {
  GetProductRequest,
  GetProductResponse,
} from '../../models/get-product';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';
import { ProductLocation } from '../../models/product-location';

@Injectable()
export class ProductCategoryService {
  private baseUrl = `${environment.webUrl}/api`;
  constructor(private http: HttpClient) {}

  getAllCategories(
    request?: GetAllCategoriesRequest
  ): Observable<DataSourceResult<GetCategoryResponse>> {
    const url = `${this.baseUrl}/Category`;
    let params = this.getParams(request);
    return this.http.get<DataSourceResult<GetCategoryResponse>>(url, {
      params,
    });
  }

  getProducts(
    request?: GetProductRequest
  ): Observable<DataSourceResult<GetProductResponse>> {
    const url = `${this.baseUrl}/Category/${request?.categoryId}/product`;
    let params = this.getParams(request);
    return this.http.get<DataSourceResult<GetProductResponse>>(url, {
      params,
    });
  }

  getProduct(
    categoryId: number,
    productId: number
  ): Observable<GetProductResponse> {
    const url = `${this.baseUrl}/Category/${categoryId}/product/${productId}`;
    return this.http.get<GetProductResponse>(url);
  }

  getCurrentLocationProduct(producId: number): Observable<ProductLocation[]> {
    const url = `${this.baseUrl}/Product/${producId}/get-current-location`;
    return this.http.get<ProductLocation[]>(url);
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
