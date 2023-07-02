import { GetProductResponse } from './../../models/get-product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from '../../services';
import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { ProductLocation, ProductStore } from '../../models/product-location';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { AddProductToCart } from '../../models/add-product-to-cart';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  categoryId: number = 0;
  quantity: number = 1;
  product: GetProductResponse;
  productLocations: ProductLocation[];
  toggle: any[] = [];
  isLoading: boolean = false;

  currentStore: ProductStore;
  remainingQuantity = 0;
  constructor(
    private route: ActivatedRoute,
    private service: ProductCategoryService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.initRequest();
    this.initProduct();
    this.initLocation();
  }

  initRequest() {
    const thisClass = this;
    this.route.queryParams.subscribe((params) => {
      thisClass.categoryId = parseInt(
        this.route.snapshot.paramMap.get('categoryId')
      );
      thisClass.productId = parseInt(
        this.route.snapshot.paramMap.get('productId')
      );
    });
  }

  initProduct() {
    this.refreshProduct();
  }

  initLocation() {
    this.service
      .getCurrentLocationProduct(this.productId)
      .subscribe((items) => {
        if (items) {
          this.productLocations = items;
          items.forEach((element) => {
            this.remainingQuantity += element.stores
              .map((a) => a.quantity ?? 0)
              .reduce((a, b) => a + b, 0);
          });

          console.log(this.productLocations);
        }
      });
  }

  refreshProduct() {
    this.isLoading = true;
    this.service.getProduct(this.categoryId, this.productId).subscribe(
      (item) => {
        if (item) {
          setTimeout(() => {
            this.product = item;
            this.isLoading = false;
          }, 500);
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onAddToCartBtnClick(): void {
    if (this.currentStore == null) {
      this.snackBarService.openSnackBar(
        'Please choose a store to add to cart."',
        SNACK_BAR_TYPE.Error
      );
      return;
    }
    var request: AddProductToCart = {
      productId: this.productId,
      storeId: this.currentStore.storeId,
      quantity: this.quantity,
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
          error?.error?.message,
          SNACK_BAR_TYPE.Error
        );
      }
    );
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

  onAddQuantityBtnClick() {
    if (this.quantity >= this.remainingQuantity) {
    } else {
      var input = document.getElementById(
        'quantitiesInput'
      ) as HTMLInputElement;
      input.value = (this.quantity++).toString();
    }
  }
  onMinusQuantityBtnClick() {
    var input = document.getElementById('quantitiesInput') as HTMLInputElement;
    if (this.quantity <= 1) {
      return;
    }
    input.value = (this.quantity--).toString();
  }

  onChangeStore(store: ProductStore): void {
    if (store) {
      this.currentStore = store;
      this.remainingQuantity = store.quantity;
      if (this.quantity >= this.remainingQuantity) {
        this.quantity = this.remainingQuantity;
      }
    }
  }
}
