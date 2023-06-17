import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/_enviroments/enviroment.prod';
import {
  GetAllCategoriesRequest,
  GetCategoryResponse,
} from 'src/app/product-category/models/GetAllCategories';
import { AddProductToCart } from 'src/app/product-category/models/add-product-to-cart';
import {
  GetProductRequest,
  GetProductResponse,
  GetSaleProductResponse,
} from 'src/app/product-category/models/get-product';
import { ProductLocation } from 'src/app/product-category/models/product-location';
import { DataSourceResult } from 'src/app/shared/models';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';

@Injectable()
export class HomeService {
  private baseUrl = `${environment.webUrl}/api`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}
  getHomeSaleProducts(
    request?: GetProductRequest
  ): Observable<DataSourceResult<GetSaleProductResponse>> {
    const url = `${this.baseUrl}/Product/get-sale-product`;
    let params = this.getParams(request);
    params = params.set('isSale', true);
    return this.http.get<DataSourceResult<GetSaleProductResponse>>(url, {
      params,
    });
  }

  getSaleProducts(
    request?: GetProductRequest
  ): Observable<DataSourceResult<GetSaleProductResponse>> {
    const url = `${this.baseUrl}/Product/${request?.categoryId}/product/get-sale-product`;
    let params = this.getParams(request);
    return this.http.get<DataSourceResult<GetSaleProductResponse>>(url, {
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

  getAllCategories(
    request?: GetAllCategoriesRequest
  ): Observable<DataSourceResult<GetCategoryResponse>> {
    const url = `${this.baseUrl}/Category`;
    let params = this.getParams(request);
    return this.http.get<DataSourceResult<GetCategoryResponse>>(url, {
      params,
    });
  }

  searchSaleProducts(
    request?: GetProductRequest
  ): Observable<DataSourceResult<GetProductResponse>> {
    const url = `${this.baseUrl}/Product`;
    let params = this.getParams(request);
    if (request?.search) {
      params = params.set('search', request?.search.toLowerCase());
    }
    params = params.set('isSale', true);
    return this.http.get<DataSourceResult<GetProductResponse>>(url, {
      params,
    });
  }

  addProductInCart(request: AddProductToCart): Observable<boolean> {
    const url = `${this.baseUrl}/Product/add-product-to-cart`;
    return this.http.post<boolean>(url, request, this.httpOptions);
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
