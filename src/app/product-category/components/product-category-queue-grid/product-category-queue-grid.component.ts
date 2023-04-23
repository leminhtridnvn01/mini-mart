import { GetAllCategoriesRequest } from '../../models/GetAllCategoriesRequest';
import { GetAllCategoriesResponse } from '../../models/GetAllCategoriesResponse';
import { ProductCategoryService } from './../../services/product-category.service';
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

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
  pages: any[][];

  constructor(private productCategoryService: ProductCategoryService) {}
  ngOnInit(): void {
    this.InitData();
  }

  InitData(): void {
    this.refreshCategory();
  }

  refreshCategory() {
    this.productCategoryService.getAllCategories().subscribe((result) => {
      if (result) {
        this.categories = result.data;
        this.totalPage = result.totalPages;
        this.pageRange = Array.from(Array(result.totalPages).keys());
        this.pages = this.transformArray(result.data);
      }
    });
  }

  private transformArray(inputArray: any[]): any[][] {
    const outputArray: any[][] = [];
    const chunkSize = 5;
    const inputSize = inputArray.length;

    for (let i = 0; i < inputArray.length; i += chunkSize) {
      const chunk = inputArray.slice(i, i + chunkSize);
      outputArray.push(chunk);
    }

    const lastChunkIndex = outputArray.length - 1;
    const lastChunkSize = outputArray[lastChunkIndex].length;
    if (lastChunkSize < chunkSize && lastChunkIndex < inputSize - 1) {
      const lastChunk = outputArray.pop();
      outputArray.push(lastChunk);
    }

    return outputArray;
  }
}
