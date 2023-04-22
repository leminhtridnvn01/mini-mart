import { GetAllCategoriesRequest } from '../../models/GetAllCategoriesRequest';
import { GetAllCategoriesResponse } from '../../models/GetAllCategoriesResponse';
import { ProductCategoryService } from './../../services/product-category.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-product-category-queue-grid',
  templateUrl: './product-category-queue-grid.component.html',
  styleUrls: ['./product-category-queue-grid.component.css'],
})
export class ProductCategoryQueueGridComponent implements OnInit {
  categories: GetAllCategoriesResponse[];
  constructor(private productCategoryService: ProductCategoryService) {}
  ngOnInit(): void {
    this.InitData();
  }

  InitData(): void {
    var request: GetAllCategoriesRequest = {
      skip: 0,
      take: 5,
    };
    this.productCategoryService
      .getAllCategories(request)
      .subscribe((result) => {
        if (result) {
          this.categories = result.data;
        }
      });
  }
}
