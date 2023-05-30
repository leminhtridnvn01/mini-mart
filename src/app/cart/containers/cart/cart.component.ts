import { Component, Inject, OnInit } from '@angular/core';

import { CartService } from './../../services/http/cart.service';
import { ProductInCart } from '../../models/product-in-cart';
import { ProductCategoryService } from 'src/app/product-category/services';
import { AddProductToCart } from 'src/app/product-category/models/add-product-to-cart';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: ProductInCart[];
  constructor(
    private cartService: CartService,
    private productService: ProductCategoryService
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
  }

  onAddQuantityBtnClick(index: number) {
    var input = document.getElementById(
      'quantitiesInput' + ' ' + index
    ) as HTMLInputElement;
    this.products[index].quantity = this.products[index]?.quantity + 1;
    input.value = (this.products[index]?.quantity).toString();

    var request: AddProductToCart = {
      quantity: 1,
      productId: this.products[index]?.id,
    };

    ///??????????????
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
  }

  onClickCheckbox(event: MatCheckboxChange, product: ProductInCart) {
    if (event.checked) {
      product.isSelected = true;
    } else {
      product.isSelected = false;
    }
  }
}
