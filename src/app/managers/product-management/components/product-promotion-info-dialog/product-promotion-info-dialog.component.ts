import { FormControl, Validators } from '@angular/forms';
import { ProductManagementService } from './../../services/http/product-management.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  GetStrategyRequest,
  GetStrategyResponse,
} from 'src/app/managers/promotion-management/models';
import { PromotionManagementService } from 'src/app/managers/promotion-management/services';

@Component({
  selector: 'app-product-promotion-info-dialog',
  templateUrl: './product-promotion-info-dialog.component.html',
  styleUrls: ['./product-promotion-info-dialog.component.css'],
})
export class ProductPromotionInfoDialogComponent implements OnInit {
  strategies: GetStrategyResponse[] = [];
  strategyForm: FormControl;

  constructor(
    public dialogRef: MatDialogRef<ProductPromotionInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productManagementService: ProductManagementService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initStrategies();
  }

  initForm() {
    this.strategyForm = new FormControl(
      this.data?.strategyId,
      Validators.required
    );
  }

  initStrategies() {
    let today = new Date();
    today.setDate(today.getDate() - 1);
    let nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);
    let request: GetStrategyRequest = {
      startDate: today,
      endDate: nextDate,
    };
    this.productManagementService
      .getManagerStrategy(request)
      .subscribe((items) => {
        if (items) {
          setTimeout(() => {
            this.strategies = items.data;
          }, 500);
        }
      });
  }
  onBtnSaveClick() {
    var request = {
      productId: this.data?.productId,
      storeId: this.data?.storeId,
      strategyId: this.strategyForm.value,
    };
    this.productManagementService.addProductStoreToStrategy(request).subscribe(
      (item) => {
        if (item) {
          this.dialogRef.close({ hasError: false });
        }
      },
      (error) => {
        this.dialogRef.close({ hasError: true });
      }
    );
  }
}
