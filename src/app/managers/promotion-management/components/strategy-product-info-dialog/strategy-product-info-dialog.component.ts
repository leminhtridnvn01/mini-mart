import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LK_OrderStatus } from 'src/app/order/enums/order-status';
import { LK_OrderType } from 'src/app/order/enums/order-type';
import { LK_PaymentMethod } from 'src/app/order/enums/payment-type';
import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { GetStrategyProductResponse } from '../../models';
import { DataSourceResult } from 'src/app/shared/models';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-strategy-product-info-dialog',
  templateUrl: './strategy-product-info-dialog.component.html',
  styleUrls: ['./strategy-product-info-dialog.component.css'],
})
export class StrategyProductInfoDialogComponent {
  displayedColumns: string[] = [
    'productId',
    'productName',
    'storeName',
    'percentageDecrease',
    'originalPrice',
    'originalPriceDecreases',
    'currentPriceDecreases',
  ];

  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 1;
  storeId: number;
  orderType = LK_OrderType;
  paymentMethod = LK_PaymentMethod;
  orderStatus = LK_OrderStatus;
  productUnit = LK_ProductUnit;

  products: DataSourceResult<GetStrategyProductResponse> = {
    data: [],
    pageNo: 0,
    pageSize: 0,
    totalRecords: 0,
  };

  constructor(
    public dialogRef: MatDialogRef<StrategyProductInfoDialogComponent>,
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
