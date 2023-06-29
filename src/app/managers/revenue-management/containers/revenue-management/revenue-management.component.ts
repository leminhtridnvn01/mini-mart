import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductLocation } from 'src/app/product-category/models/product-location';
import { RevenueManagementService } from '../../services';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { GetRenueveOrderResponse, GetRenueveRequest } from '../../models';
import { IPagingRequest } from 'src/app/shared/models/paging-request.model';
import { LK_OrderType } from 'src/app/order/enums/order-type';
import { LK_PaymentMethod } from 'src/app/order/enums/payment-type';
import { LK_OrderStatus } from 'src/app/order/enums/order-status';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-revenue-management',
  templateUrl: './revenue-management.component.html',
  styleUrls: ['./revenue-management.component.css'],
})
export class RevenueManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId',
    'originalPrice',
    'priceDecreases',
    'deliveryFee',
    'totalPrice',
    'lK_OrderStatus',
    'lK_PaymentMethod',
    'lK_OrderType',
    'userName',
    'phoneNumber',
    'deliveryAddress',
    'createdOn',
  ];

  isLoading: boolean = false;
  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 1;
  orderType = LK_OrderType;
  paymentMethod = LK_PaymentMethod;
  orderStatus = LK_OrderStatus;

  locations: ProductLocation[];
  revenueOrders: GetRenueveOrderResponse[];
  revenueTotal: number;

  storeId: number;
  locationForm: FormControl;
  startDateForm: FormControl;
  endDateForm: FormControl;
  dateRangeForm: FormControl;

  constructor(
    private revenueManagementService: RevenueManagementService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.initLocations();
    this.initForm();
  }

  initForm() {
    this.locationForm = new FormControl('', Validators.required);
    this.startDateForm = new FormControl('', Validators.required);
    this.endDateForm = new FormControl('', Validators.required);
    this.dateRangeForm = new FormControl('', Validators.required);
  }

  initLocations() {
    this.revenueManagementService.getMyStoreLocations().subscribe((item) => {
      if (item) {
        this.locations = item;
      }
    });
  }

  refreshRenueveOrder(request: GetRenueveRequest) {
    this.isLoading = true;
    this.revenueManagementService.getRevenueOrder(request).subscribe(
      (item) => {
        if (item) {
          setTimeout(() => {
            this.revenueOrders = item.renueveOrders.data;
            this.pageIndex = item.renueveOrders.pageNo;
            this.pageSize = item.renueveOrders.pageSize;
            this.length = item.renueveOrders.totalRecords;
            this.revenueTotal = item.totalRenueve;
            this.isLoading = false;
          }, 600);
        } else {
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onDateRangeChange(event: any) {}

  onBtnSearchClick() {
    if (
      this.startDateForm.valid &&
      this.endDateForm.valid &&
      this.locationForm.valid
    ) {
      let request: GetRenueveRequest = {
        pageNo: 1,
        pageSize: this.pageSize,
        startDate: this.startDateForm?.value?.toLocaleString(),
        endDate: this.endDateForm?.value?.toLocaleString(),
        storeId: +this.locationForm.value,
      };

      this.refreshRenueveOrder(request);
    } else {
      this.startDateForm.markAllAsTouched();
      this.endDateForm.markAllAsTouched();
      this.locationForm.markAllAsTouched();
    }
  }

  pageChange(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.length = event.length;
      let request: GetRenueveRequest = {
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
        startDate: this.startDateForm?.value?.toLocaleString(),
        endDate: this.endDateForm?.value?.toLocaleString(),
        storeId: +this.locationForm.value,
      };
      this.refreshRenueveOrder(request);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng từ 0-11, cần +1 và đảm bảo 2 chữ số
    const day = date.getDate().toString().padStart(2, '0'); // Ngày trong tháng, đảm bảo 2 chữ số
    const year = date.getFullYear().toString(); // Năm

    return `${month}/${day}/${year}`;
  }

  formatMoney(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
}
