import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../../services/http/product-management.service';
import {
  GetProductManagerRequest,
  GetProductManagerResponse,
} from '../../models';
import { MatOptionSelectionChange } from '@angular/material/core';
import { GetProductResponse } from 'src/app/product-category/models/get-product';
import {
  ProductLocation,
  ProductStore,
} from 'src/app/product-category/models/product-location';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { ProductManagementInfoDialogComponent } from '../../components/product-management-info-dialog/product-management-info-dialog.component';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'quantity',
    'originalPrice',
    'originalPriceDecreases',
    // 'currentPrice',
    'currentPriceDecreases',
    'action',
  ];

  products: GetProductManagerResponse[];
  locations: ProductLocation[];
  locationForm: FormControl;
  isLoading: boolean = false;
  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 1;
  storeId: number;

  constructor(
    private productManagementService: ProductManagementService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {
    this.locationForm = new FormControl('');
  }

  ngOnInit(): void {
    this.initLocations();
    // this.initProducts();
  }

  initLocations() {
    this.productManagementService.getMyStoreLocations().subscribe((item) => {
      if (item) {
        this.locations = item;
      }
    });
  }

  initProducts() {
    var request: GetProductManagerRequest = {
      pageNo: 1,
      pageSize: 10,
      storeId: 12,
    };
    this.refreshProducts(request);
  }

  refreshProducts(request: GetProductManagerRequest) {
    this.isLoading = true;
    this.productManagementService.getStoreProducts(request).subscribe(
      (items) => {
        if (items) {
          setTimeout(() => {
            this.products = items.data;
            this.pageSize = items.pageSize;
            this.pageIndex = items.pageNo;
            this.length = items.totalRecords;
            this.storeId = request.storeId;
            this.isLoading = false;
          }, 500);
        }
      },
      (error) => {
        this.isLoading = false;
      },
      () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    );
  }

  onSelectLocation(event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      var request: GetProductManagerRequest = {
        pageNo: 1,
        pageSize: this.pageSize,
        storeId: event.source.value,
      };
      this.refreshProducts(request);
    }
  }

  pageChange(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.length = event.length;
      var request: GetProductManagerRequest = {
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
        storeId: this.locationForm.value,
      };
      this.refreshProducts(request);
    }
  }

  onBtnAddNewClick() {
    this.dialog
      .open(ProductManagementInfoDialogComponent, {
        data: {},
        width: '800px',
        disableClose: false,
      })
      .afterClosed()
      .subscribe(
        (afterClosedData) => {
          if (!afterClosedData) return;

          if (afterClosedData.hasError) {
            this.snackBarService.openSnackBar(
              'Create Product fail!, Try again.',
              SNACK_BAR_TYPE.Error
            );
            return;
          }

          this.snackBarService.openSnackBar(
            'New Product has been created',
            SNACK_BAR_TYPE.Success
          );

          var request: GetProductManagerRequest = {
            pageNo: 1,
            pageSize: this.pageSize,
            storeId: this.storeId,
          };
          this.refreshProducts(request);
        },
        (error) => {
          this.snackBarService.openSnackBar(
            'Internal Server Error',
            SNACK_BAR_TYPE.Error
          );
        }
      );
  }

  onBtnEditClick(product: GetProductManagerResponse) {
    this.dialog
      .open(ProductManagementInfoDialogComponent, {
        data: {
          isEdit: true,
          productId: product.productId,
          name: product.name,
          description: product.description,
          categoryId: product.categoryId,
          productUnit: product.lK_ProductUnit,
          price: product.originalPrice,
          priceDecreases: product.originalPriceDecreases,
          storeId: this.locationForm.value,
          quantity: product.quantity,
        },
        width: '800px',
        disableClose: false,
      })
      .afterClosed()
      .subscribe(
        (afterClosedData) => {
          if (!afterClosedData) return;

          if (afterClosedData.hasError) {
            this.snackBarService.openSnackBar(
              'Edit Product fail!, Try again.',
              SNACK_BAR_TYPE.Error
            );
            return;
          }

          this.snackBarService.openSnackBar(
            'Product has been updated',
            SNACK_BAR_TYPE.Success
          );

          var request: GetProductManagerRequest = {
            pageNo: 1,
            pageSize: this.pageSize,
            storeId: this.storeId,
          };
          this.refreshProducts(request);
        },
        (error) => {
          this.snackBarService.openSnackBar(
            'Internal Server Error',
            SNACK_BAR_TYPE.Error
          );
        }
      );
  }

  addCommas(num: number): string {
    if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return num.toString();
    }
  }

  formatMoney(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
}
