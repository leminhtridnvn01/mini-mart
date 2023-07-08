import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { AddProductToCart } from 'src/app/product-category/models/add-product-to-cart';
import {
  GetProductRequest,
  GetProductResponse,
  GetSaleProductResponse,
} from 'src/app/product-category/models/get-product';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';
import { HomeService } from '../../services';
import { SubSink } from 'src/app/shared/models';
import { CommonCommunicationService } from 'src/app/common/services';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { filter } from 'rxjs';
import { GridAction } from 'src/app/common/enums/grid-action';
import { AuthenticationService } from 'src/app/_authentication/services';

@Component({
  selector: 'app-sale-product-queue-grid',
  templateUrl: './sale-product-queue-grid.component.html',
  styleUrls: ['./sale-product-queue-grid.component.css'],
})
export class SaleProductQueueGridComponent {
  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 0;
  categoryIdSelected: number = 0;
  products: GetSaleProductResponse[];
  isLoading: boolean = false;

  private subscriptions = new SubSink();

  @Input() selectedCategory: number;

  constructor(
    private homeService: HomeService,
    private communicator: CommonCommunicationService,
    private snackBarService: SnackBarService,
    public authService: AuthenticationService
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
            action?.payload?.grid === 'SaleProductCategoryQueueGrid'
        )
      )
      .subscribe((action) => {
        if (action?.payload?.grid) {
          switch (action.payload?.grid) {
            case 'SaleProductCategoryQueueGrid':
              this.categoryIdSelected = action.payload?.categorySelected;
              this.pageIndex = 0;
              this.refreshProductItems();
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
    this.homeService.searchSaleProducts(request).subscribe(
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
    this.homeService.getSaleProducts(request).subscribe(
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
    this.homeService.addProductInCart(request).subscribe(
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
