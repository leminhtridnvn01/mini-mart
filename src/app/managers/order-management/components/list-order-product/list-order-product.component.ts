import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProductInCart } from 'src/app/cart/models/product-in-cart';
import { LK_OrderStatus } from 'src/app/order/enums/order-status';
import { LK_OrderType } from 'src/app/order/enums/order-type';
import { LK_PaymentMethod } from 'src/app/order/enums/payment-type';
import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { DataSourceResult } from 'src/app/shared/models';

@Component({
  selector: 'app-list-order-product',
  templateUrl: './list-order-product.component.html',
  styleUrls: ['./list-order-product.component.css'],
})
export class ListOrderProductComponent implements OnInit {
  displayedColumns: string[] = [
    'productId',
    'name',
    'description',
    'categoryId',
    'lk_ProductUnit',
    'quantity',
    'price',
    'priceDecreases',
  ];

  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 1;
  storeId: number;
  orderType = LK_OrderType;
  paymentMethod = LK_PaymentMethod;
  orderStatus = LK_OrderStatus;
  productUnit = LK_ProductUnit;
  products: DataSourceResult<ProductInCart> = {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecords: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<ListOrderProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.products.data = data?.products?.slice(0, 5);
    this.products.totalRecords = data?.products.length;
    this.products.pageNo = 1;
    this.products.pageSize = 5;
  }

  ngOnInit(): void {
    this.pageIndex = this.data.pageNo;
    this.pageSize = 5;
    this.length = this.data?.products?.length;
  }

  pageChange(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.length = event.length;

      this.products.data = this.data?.products?.slice(
        this.pageIndex - 1,
        this.pageSize * this.pageIndex
      );
    }
  }

  formatMoney(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
}
