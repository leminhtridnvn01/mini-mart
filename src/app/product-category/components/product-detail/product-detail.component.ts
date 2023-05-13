import { GetProductResponse } from './../../models/get-product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from '../../services';
import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { ProductLocation } from '../../models/product-location';
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

  constructor(
    private route: ActivatedRoute,
    private service: ProductCategoryService
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
    var input = document.getElementById('quantitiesInput') as HTMLInputElement;
    input.value = (this.quantity++).toString();
  }
  onMinusQuantityBtnClick() {
    var input = document.getElementById('quantitiesInput') as HTMLInputElement;
    if (this.quantity <= 1) {
      return;
    }
    input.value = (this.quantity--).toString();
  }
}
