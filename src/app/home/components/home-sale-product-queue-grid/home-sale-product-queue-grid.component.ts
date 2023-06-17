import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';

import {
  GetProductRequest,
  GetProductResponse,
  GetSaleProductResponse,
} from 'src/app/product-category/models/get-product';
import { HomeService } from '../../services';
import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';
import { AddProductToCart } from 'src/app/product-category/models/add-product-to-cart';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-sale-product-queue-grid',
  templateUrl: './home-sale-product-queue-grid.component.html',
  styleUrls: ['./home-sale-product-queue-grid.component.css'],
})
export class HomeSaleProductQueueGridComponent implements OnInit {
  pageSize: number = 5;
  length: number = 0;
  pageIndex: number = 0;
  categoryIdSelected: number = 0;
  products: GetSaleProductResponse[];
  isLoading: boolean = false;

  @Input() selectedCategory: number;

  constructor(
    private service: HomeService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.initProductItems();
  }
  initProductItems() {
    var request = {
      categoryId: 1,
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.refreshProductItems(request);
  }
  refreshProductItems(
    request: GetProductRequest = {
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
    }
  ) {
    this.isLoading = true;
    this.service.getHomeSaleProducts(request).subscribe(
      (items) => {
        if (items) {
          setTimeout(() => {
            this.products = items.data;
            this.pageSize = items.pageSize;
            this.length = items.totalRecords;
            this.pageIndex = items.pageNo;
          }, 500);
        }
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  pageChange(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.length = event.length;
      var request: GetProductRequest = {
        categoryId: this.categoryIdSelected,
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
      };
      this.refreshProductItems(request);
    }
  }

  onAddToCart(
    product: GetSaleProductResponse,
    quantity: number,
    productIndex: number
  ) {
    var request: AddProductToCart = {
      productId: product.id,
      storeId: product.storeId,
      quantity: quantity,
    };
    this.service.addProductInCart(request).subscribe(
      (item) => {
        if (item) {
          this.snackBarService.openSnackBar(
            'Product is added to cart',
            SNACK_BAR_TYPE.Success
          );
        }
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Fail to add this product to cart',
          SNACK_BAR_TYPE.Error
        );
      }
    );
    return;
  }

  onSelectLocation(prodcut: GetProductResponse): void {
    prodcut.isValid = true;
  }

  formatProductUnit(unit: number): string {
    return LK_ProductUnit[unit];
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

  toControl(absCtrl: AbstractControl): FormControl {
    return absCtrl as FormControl;
  }
}
