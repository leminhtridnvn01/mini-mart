import { HomeService } from './../../services/http/home.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { GridAction } from 'src/app/common/enums/grid-action';
import { CommonCommunicationService } from 'src/app/common/services';
import { GetCategoryResponse } from 'src/app/product-category/models/GetAllCategories';

@Component({
  selector: 'app-sale-product-category-queue-grid',
  templateUrl: './sale-product-category-queue-grid.component.html',
  styleUrls: ['./sale-product-category-queue-grid.component.css'],
})
export class SaleProductCategoryQueuGridComponent {
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
    private homeService: HomeService,
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
    this.homeService.getAllCategories().subscribe(
      (result) => {
        if (result) {
          setTimeout(() => {
            this.categories = result.data;
            this.totalPage = result.totalPages;
            this.pageRange = Array.from(Array(result.totalPages).keys());
            this.pages = this.transformArray(result.data);
            this.isLoading = false;
          }, 500);
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
      grid: 'SaleProductCategoryQueueGrid',
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
