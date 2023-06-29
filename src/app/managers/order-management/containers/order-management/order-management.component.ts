import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductLocation } from 'src/app/product-category/models/product-location';
import { OrderManagementService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { PageEvent } from '@angular/material/paginator';
import { GetManagerOrderRequest } from 'src/app/order/models/get-order-request';
import { Order } from 'src/app/order/models/order';
import { MatOptionSelectionChange } from '@angular/material/core';
import { LK_OrderType } from 'src/app/order/enums/order-type';
import { LK_PaymentMethod } from 'src/app/order/enums/payment-type';
import { LK_OrderStatus } from 'src/app/order/enums/order-status';
import {
  ListOrderProductComponent,
  OrderStatusInfoDialogComponent,
} from '../../components';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
})
export class OrderManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId',
    'orderStatus',
    'orderType',
    'totalPrice',
    'paymentMethod',
    'userName',
    'deliveryAddress',
    'contactPhoneNumber',
    'pickupTimeFrom',
    'pickupTimeTo',
    'products',
  ];

  locations: ProductLocation[];
  locationForm: FormControl;
  isLoading: boolean = false;
  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 1;
  storeId: number;
  orderType = LK_OrderType;
  paymentMethod = LK_PaymentMethod;
  orderStatus = LK_OrderStatus;

  orders: Order[];

  constructor(
    private orderManagementService: OrderManagementService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
    this.locationForm = new FormControl('');
  }

  ngOnInit(): void {
    this.initLocations();
  }

  initLocations() {
    this.orderManagementService.getMyStoreLocations().subscribe((item) => {
      if (item) {
        this.locations = item;
      }
    });
  }

  initOrder() {
    const request: GetManagerOrderRequest = {
      pageNo: 1,
      pageSize: 10,
      storeId: +this.locationForm.value,
    };
    this.refreshOrder(request);
  }

  refreshOrder(request: GetManagerOrderRequest) {
    this.isLoading = true;
    this.orderManagementService.getManagerOrders(request).subscribe(
      (items) => {
        if (items) {
          setTimeout(() => {
            this.orders = items.data;
            this.pageIndex = items.pageNo;
            this.pageSize = items.pageSize;
            this.length = items.totalRecords;
            this.isLoading = false;
          }, 500);
        } else {
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onSelectLocation(event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      const request: GetManagerOrderRequest = {
        pageNo: 1,
        pageSize: this.pageSize,
        storeId: event.source.value,
      };
      this.refreshOrder(request);
    }
  }

  onBtnViewClick(order: Order) {
    this.dialog
      .open(ListOrderProductComponent, {
        data: {
          products: order.products,
        },
        disableClose: false,
        width: '1200px',
      })
      .afterClosed();
  }

  onEditStatus(order: Order) {
    this.dialog
      .open(OrderStatusInfoDialogComponent, {
        data: {
          orderStatus: order.orderStatus,
        },
        disableClose: false,
        width: '600px',
      })
      .afterClosed();
  }

  pageChange(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.length = event.length;

      const request: GetManagerOrderRequest = {
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
        storeId: this.locationForm.value,
      };
      this.refreshOrder(request);
    }
  }

  formatMoney(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
}
