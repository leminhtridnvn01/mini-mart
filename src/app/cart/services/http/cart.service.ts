import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/app/_enviroments/enviroment.prod';
import { GetProductInCart } from '../../models/product-in-cart';
import { DataSourceResult } from 'src/app/shared/models';

@Injectable()
export class CartService {
  private baseUrl = `${environment.webUrl}/api`;
  constructor(private http: HttpClient) {}

  getProductInCart(): Observable<DataSourceResult<GetProductInCart>> {
    const url = `${this.baseUrl}/Product/get-product-in-cart`;
    return this.http.get<DataSourceResult<GetProductInCart>>(url);
  }
}
