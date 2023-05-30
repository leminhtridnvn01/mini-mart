import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/app/_enviroments/enviroment.prod';
import { ProductInCart } from '../../models/product-in-cart';
import { DataSourceResult } from 'src/app/shared/models';
import { City } from '../../models/city';
import { Store } from '../../models/store';
import { Order } from '../../models/order';

@Injectable()
export class CartService {
  private baseUrl = `${environment.webUrl}/api`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getProductInCart(): Observable<DataSourceResult<ProductInCart>> {
    const url = `${this.baseUrl}/Product/get-product-in-cart`;
    return this.http.get<DataSourceResult<ProductInCart>>(url);
  }

  getCities(): Observable<City[]> {
    const url = `${this.baseUrl}/Order/get-location/cities`;
    return this.http.get<City[]>(url);
  }

  getStores(cityId: number): Observable<Store[]> {
    const url = `${this.baseUrl}/Order/get-location/cities/${cityId}/stores`;
    return this.http.get<Store[]>(url);
  }

  addOrder(request: Order): Observable<boolean> {
    const url = `${this.baseUrl}/Order/add-to-order`;
    return this.http.post<boolean>(url, request, this.httpOptions);
  }
}
