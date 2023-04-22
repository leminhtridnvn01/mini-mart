import { GetAllCategoriesRequest } from '../../models/GetAllCategoriesRequest';
import { GetAllCategoriesResponse } from '../../models/GetAllCategoriesResponse';
import { ProductCategoryService } from './../../services/product-category.service';
import { Component, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-product-category-queue-grid',
  templateUrl: './product-category-queue-grid.component.html',
  styleUrls: ['./product-category-queue-grid.component.css'],
})
export class ProductCategoryQueueGridComponent implements OnInit {
  categories: GetAllCategoriesResponse[];
  totalPage = 1;
  pageRange: any[] = [3];
  currentPage = 1;
  page: [][];

  constructor(private productCategoryService: ProductCategoryService) {}
  ngOnInit(): void {
    this.InitData();
  }

  InitData(): void {
    this.refreshCategory();
  }

  refreshCategory() {
    var request: GetAllCategoriesRequest = {
      pageNo: this.currentPage,
      pageSize: 5,
    };
    this.productCategoryService
      .getAllCategories(request)
      .subscribe((result) => {
        if (result) {
          this.categories = result.data;
          this.totalPage = result.totalPages;
          this.pageRange = Array.from(Array(result.totalPages).keys());
        }
      });
  }
  onNextBtnClick(): void {
    if (this.currentPage == this.totalPage) {
      this.currentPage = 1;
    } else {
      this.currentPage += 1;
    }
    console.log(this.currentPage);
    this.refreshCategory();
  }

  onPrevBtnClick(): void {
    if (this.currentPage == 1 || this.totalPage == 1) {
      this.currentPage = this.totalPage;
    } else {
      this.currentPage -= 1;
    }
    console.log(this.currentPage);
    this.refreshCategory();
  }
}
