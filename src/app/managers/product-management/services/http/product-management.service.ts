import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/_enviroments/enviroment.prod';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';
import { DataSourceResult } from 'src/app/shared/models';
import {
  CreateProductToOrderRequest,
  EditProductToOrderRequest,
  GetLocationManageStoreResponse,
  GetProductManagerRequest,
  GetProductManagerResponse,
} from '../../models';
import {
  GetAllCategoriesRequest,
  GetCategoryResponse,
} from 'src/app/product-category/models/GetAllCategories';
import {
  GetStrategyRequest,
  GetStrategyResponse,
} from 'src/app/managers/promotion-management/models';

@Injectable()
export class ProductManagementService {
  private baseUrl = `${environment.webUrl}/api`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getStoreProducts(
    request: GetProductManagerRequest
  ): Observable<DataSourceResult<GetProductManagerResponse>> {
    const url = `${this.baseUrl}/Product/get-manager-product`;
    let params = this.getParams(request);
    if (request?.storeId) {
      params = params.set('storeId', request?.storeId?.toString());
    }
    if (request?.search) {
      params = params.set('search', request?.search?.toString());
    }
    return this.http.get<DataSourceResult<GetProductManagerResponse>>(url, {
      params,
    });
  }

  getMyStoreLocations(): Observable<GetLocationManageStoreResponse[]> {
    const url = `${this.baseUrl}/Store/get-store-manager`;
    return this.http.get<GetLocationManageStoreResponse[]>(url);
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

  createProduct(request: CreateProductToOrderRequest): Observable<boolean> {
    const url = `${this.baseUrl}/Product`;
    const formData = new FormData();
    formData.append('name', request.name ?? '');
    formData.append('description', request.description ?? '');
    formData.append('price', request.price.toString() ?? '0');
    formData.append('priceDecreases', request.priceDecreases.toString() ?? '0');
    formData.append('lK_ProductUnit', request.lK_ProductUnit.toString() ?? '0');
    formData.append('categoryId', request.categoryId.toString() ?? '0');
    request.storeIds.forEach((item) => {
      formData.append('storeIds', item.toString());
    });
    formData.append('img', request.img ?? new Blob());
    return this.http.post<boolean>(url, formData);
  }

  editProduct(request: EditProductToOrderRequest): Observable<boolean> {
    const url = `${this.baseUrl}/Product`;
    const formData = new FormData();
    formData.append('productId', request.productId.toString() ?? '');
    formData.append('name', request.name ?? '');
    formData.append('description', request.description ?? '');
    formData.append('price', request.price.toString() ?? '0');
    formData.append('priceDecreases', request.priceDecreases.toString() ?? '0');
    formData.append(
      'currentPriceDecreases',
      request.currentPriceDecreases.toString() ?? '0'
    );
    formData.append('lK_ProductUnit', request.lK_ProductUnit.toString() ?? '0');
    formData.append('categoryId', request.categoryId.toString() ?? '0');
    formData.append('storeId', request.storeId.toString() ?? '0');
    formData.append('quantity', request.quantity.toString() ?? '0');
    formData.append('img', request.img ?? new Blob());
    return this.http.put<boolean>(url, formData);
  }

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

  addProductStoreToStrategy(request: any): Observable<boolean> {
    const url = `${this.baseUrl}/Strategy/add-product-store-to-strategy`;
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
