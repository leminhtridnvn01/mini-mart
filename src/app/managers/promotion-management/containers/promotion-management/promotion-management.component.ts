import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LK_OrderStatus } from 'src/app/order/enums/order-status';
import { LK_OrderType } from 'src/app/order/enums/order-type';
import { LK_PaymentMethod } from 'src/app/order/enums/payment-type';
import { ProductLocation } from 'src/app/product-category/models/product-location';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { PromotionManagementService } from '../../services';
import { GetStrategyRequest, GetStrategyResponse } from '../../models';
import { LK_ActivatedStrategyStatus } from 'src/app/managers/revenue-management/enums';
import { PageEvent } from '@angular/material/paginator';
import { StrategyProductInfoDialogComponent } from '../../components';

@Component({
  selector: 'app-promotion-management',
  templateUrl: './promotion-management.component.html',
  styleUrls: ['./promotion-management.component.css'],
})
export class PromotionManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'percentageDecrease',
    'activatedDateFrom',
    'activatedDateTo',
    'status',
    'detail',
  ];

  isLoading: boolean = false;
  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 1;
  orderType = LK_OrderType;
  paymentMethod = LK_PaymentMethod;
  orderStatus = LK_OrderStatus;
  strategyStatus = LK_ActivatedStrategyStatus;

  locations: ProductLocation[] = [];
  strategies: GetStrategyResponse[] = [];

  locationForm: FormControl;
  startDateForm: FormControl;
  endDateForm: FormControl;

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private promotionManagementService: PromotionManagementService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.locationForm = new FormControl('', Validators.required);
    this.startDateForm = new FormControl('', Validators.required);
    this.endDateForm = new FormControl('', Validators.required);
  }

  refreshOrder(request: GetStrategyRequest) {
    this.isLoading = true;
    this.promotionManagementService.getManagerStrategy(request).subscribe(
      (items) => {
        if (items) {
          setTimeout(() => {
            this.strategies = items.data;
            this.pageIndex = items.pageNo;
            this.pageSize = items.pageSize;
            this.length = items.totalRecords;
            this.isLoading = false;
          }, 500);
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onBtnSearchClick() {
    if (this.startDateForm.valid && this.endDateForm.valid) {
      let request: GetStrategyRequest = {
        pageNo: 1,
        pageSize: this.pageSize,
        startDate: this.startDateForm?.value?.toLocaleString(),
        endDate: this.endDateForm?.value?.toLocaleString(),
      };
      this.refreshOrder(request);
    } else {
      this.startDateForm.markAllAsTouched();
      this.endDateForm.markAllAsTouched();
    }
  }

  onBtnViewClick(strategy: GetStrategyResponse) {
    this.dialog
      .open(StrategyProductInfoDialogComponent, {
        data: {
          products: strategy.products,
        },
        disableClose: false,
        width: '1200px',
      })
      .afterClosed();
  }

  onBtnAddNewClick() {}

  pageChange(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.length = event.length;
      let request: GetStrategyRequest = {
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
        startDate: this.startDateForm?.value?.toLocaleString(),
        endDate: this.endDateForm?.value?.toLocaleString(),
      };
      this.refreshOrder(request);
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
