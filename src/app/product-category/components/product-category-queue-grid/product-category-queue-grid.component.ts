import { CommonCommunicationService } from 'src/app/common/services';
import { GetAllCategoriesRequest } from '../../models/GetAllCategories';
import { GetCategoryResponse } from '../../models/GetAllCategories';
import { ProductCategoryService } from '../../services/http/product-category.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { GridAction } from 'src/app/common/enums/grid-action';

@Component({
  selector: 'app-product-category-queue-grid',
  templateUrl: './product-category-queue-grid.component.html',
  styleUrls: ['./product-category-queue-grid.component.css'],
})
export class ProductCategoryQueueGridComponent implements OnInit {
  categories: GetCategoryResponse[];
  totalPage = 1;
  pageRange: any[] = [3];
  currentPage = 1;
  page: [][];
  pages: any[][];
  isLoading: boolean = false;

  @Output('selectedCategory') selectedCategoryEvent =
    new EventEmitter<number>();

  constructor(
    private productCategoryService: ProductCategoryService,
    private communicator: CommonCommunicationService
  ) {}
  ngOnInit(): void {
    this.InitData();
  }

  InitData(): void {
    this.refreshCategory();
  }

  refreshCategory() {
    this.isLoading = true;
    this.productCategoryService.getAllCategories().subscribe(
      (result) => {
        if (result) {
          setTimeout(() => {
            this.categories = result.data;
            this.totalPage = result.totalPages;
            this.pageRange = Array.from(Array(result.totalPages).keys());
            this.pages = this.transformArray(result.data);
            this.isLoading = false;
          }, 500);
        } else {
          this.isLoading = false;
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  onSelectedCategory(categoryId: number) {
    this.selectedCategoryEvent.emit(categoryId);
    this.communicator.send(GridAction.GridItemClick, {
      categorySelected: categoryId,
      grid: 'ProductCategoryQueueGrid',
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
