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
import { ProductCategoryCommunicationService } from '../../services/logic/product-category-communicate.service';
import { GridAction } from 'src/app/shared/enums/grid-action';

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

  @Output('selectedCategory') selectedCategoryEvent =
    new EventEmitter<number>();

  constructor(
    private productCategoryService: ProductCategoryService,
    private communicator: ProductCategoryCommunicationService
  ) {}
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
