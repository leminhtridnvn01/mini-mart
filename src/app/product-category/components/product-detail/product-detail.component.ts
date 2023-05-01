import { GetProductResponse } from './../../models/get-product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from '../../services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  categoryId: number = 0;
  product: GetProductResponse;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.initRequest();
    this.initProduct();
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
}
