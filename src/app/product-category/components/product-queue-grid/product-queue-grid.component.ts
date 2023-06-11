import { Component, Input, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../services';
import {
  GetProductRequest,
  GetProductResponse,
} from '../../models/get-product';
import { SubSink } from 'src/app/shared/models';
import { filter } from 'rxjs';
import { GridAction } from 'src/app/common/enums/grid-action';
import { PageEvent } from '@angular/material/paginator';
import { LK_ProductUnit } from '../../enums/product-unit';
import { AddProductToCart } from '../../models/add-product-to-cart';
import { CommonCommunicationService } from 'src/app/common/services';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';
import {
  AbstractControl,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-queue-grid',
  templateUrl: './product-queue-grid.component.html',
  styleUrls: ['./product-queue-grid.component.css'],
})
export class ProductQueueGridComponent implements OnInit {
  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 0;
  categoryIdSelected: number = 0;
  products: GetProductResponse[];
  isLoading: boolean = false;
  locationForms: FormArray;

  private subscriptions = new SubSink();

  @Input() selectedCategory: number;

  constructor(
    private service: ProductCategoryService,
    private communicator: CommonCommunicationService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.initProductItems();
  }

  initProductItems() {
    this.subscriptions.sink = this.communicator.signal
      .pipe(
        filter(
          (action) =>
            action?.action === GridAction.GridItemClick &&
            (action?.payload?.grid === 'ProductCategoryQueueGrid' ||
              action?.payload?.grid === 'ProductSearchQueueGrid')
        )
      )
      .subscribe((action) => {
        if (action?.payload?.grid) {
          switch (action.payload?.grid) {
            case 'ProductCategoryQueueGrid':
              this.categoryIdSelected = action.payload?.categorySelected;
              this.pageIndex = 0;
              this.refreshProductItems();
              break;
            case 'ProductSearchQueueGrid':
              this.pageIndex = 0;
              this.searchProductItems(action.payload?.search);
              break;
            default:
              break;
          }
        }
      });
  }

  searchProductItems(search: string) {
    var request: GetProductRequest = {
      search: search,
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.isLoading = true;
    this.service.searchProducts(request).subscribe(
      (items) => {
        if (items) {
          setTimeout(() => {
            this.products = items.data;
            this.pageSize = items.pageSize;
            this.length = items.totalRecords;
            this.pageIndex = items.pageNo;
            this.isLoading = false;
          }, 500);
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  refreshProductItems(
    request: GetProductRequest = {
      categoryId: this.categoryIdSelected,
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
    }
  ) {
    this.isLoading = true;
    this.service.getProducts(request).subscribe(
      (items) => {
        if (items) {
          setTimeout(() => {
            this.products = items.data;
            this.locationForms = new FormArray([]);
            this.products.forEach((product) => {
              this.locationForms.push(new FormControl('', Validators.required));
            });
            this.pageSize = items.pageSize;
            this.length = items.totalRecords;
            this.pageIndex = items.pageNo;
            this.isLoading = false;
          }, 500);
        }
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
    product: GetProductResponse,
    quantity: number,
    productIndex: number
  ) {
    if (product.isValid) {
      var request: AddProductToCart = {
        productId: product.id,
        storeId: this.locationForms.at(productIndex).value,
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
    this.locationForms.at(productIndex).markAllAsTouched();
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
