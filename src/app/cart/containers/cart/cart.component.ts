import { Component, Inject, OnInit } from '@angular/core';

import { CartService } from './../../services/http/cart.service';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductCategoryService } from 'src/app/product-category/services';
import { AddProductToCart } from 'src/app/product-category/models/add-product-to-cart';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommonCommunicationService } from 'src/app/common/services';
import { GridAction } from 'src/app/common/enums/grid-action';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: ProductInCart[];
  selectedProductsCount = 0;
  selectedProducsTotalPrice = 0;
  constructor(
    private cartService: CartService,
    private productService: ProductCategoryService,
    private communicator: CommonCommunicationService,
    private snackBarService: SnackBarService
  ) {}
  ngOnInit(): void {
    this.initProductInCart();
  }
  initProductInCart() {
    this.cartService.getProductInCart().subscribe((items) => {
      if (items) {
        this.products = items.data;
      }
    });
  }
  formatMoney(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }

  onMinusQuantityBtnClick(index: number) {
    var input = document.getElementById(
      'quantitiesInput' + ' ' + index
    ) as HTMLInputElement;
    if (this.products[index]?.quantity <= 1) {
      return;
    }
    this.products[index].quantity = this.products[index]?.quantity - 1;
    input.value = (this.products[index]?.quantity).toString();

    var request: AddProductToCart = {
      quantity: -1,
      productId: this.products[index]?.id,
      storeId: this.products[index]?.storeId,
    };

    this.productService.addProductInCart(request).subscribe(
      (item) => {
        if (item) {
          //do something as Pop-up, alert...
        }
      },
      (error) => {
        //do something as Pop-up, alert...
      }
    );
    this.refreshSelectedProductInfo();
  }

  onAddQuantityBtnClick(index: number) {
    var input = document.getElementById(
      'quantitiesInput' + ' ' + index
    ) as HTMLInputElement;

    var request: AddProductToCart = {
      quantity: 1,
      productId: this.products[index]?.id,
      storeId: this.products[index]?.storeId,
    };

    ///??????????????
    this.productService.addProductInCart(request).subscribe(
      (item) => {
        if (item) {
          //do something as Pop-up, alert...
          this.products[index].quantity = this.products[index]?.quantity + 1;
          input.value = (this.products[index]?.quantity).toString();
          this.refreshSelectedProductInfo();
        }
      },
      (error) => {
        //do something as Pop-up, alert...
        this.snackBarService.openSnackBar(
          error?.error?.message,
          SNACK_BAR_TYPE.Error
        );
        this.refreshSelectedProductInfo();
      }
    );
    this.refreshSelectedProductInfo();
  }

  onClickCheckbox(event: MatCheckboxChange, product: ProductInCart) {
    if (event.checked) {
      product.isSelected = true;
    } else {
      product.isSelected = false;
    }
    this.refreshSelectedProductInfo();
  }

  refreshSelectedProductInfo(): void {
    var selectedProducts = this.products.filter((x) => x.isSelected);
    this.selectedProductsCount = selectedProducts.length;
    this.selectedProducsTotalPrice = selectedProducts
      .map(
        (x) =>
          x.quantity *
          (x.priceDecreases && x.priceDecreases != 0
            ? x.priceDecreases
            : x.price)
      )
      .reduce((pre, cur) => pre + cur, 0);
  }
}
