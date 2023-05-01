import { Component, Input, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../services';
import {
  GetProductRequest,
  GetProductResponse,
} from '../../models/get-product';
import { SubSink } from 'src/app/shared/models';
import { ProductCategoryCommunicationService } from '../../services/logic/product-category-communicate.service';
import { filter } from 'rxjs';
import { GridAction } from 'src/app/shared/enums/grid-action';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-queue-grid',
  templateUrl: './product-queue-grid.component.html',
  styleUrls: ['./product-queue-grid.component.css'],
})
export class ProductQueueGridComponent implements OnInit {
  pageSize: number = 10;
  length: number = 0;
  pageIndex: number = 0;
  categoryIdSelected: number = 0;
  products: GetProductResponse[];
  isLoading: boolean = false;

  private subscriptions = new SubSink();

  @Input() selectedCategory: number;

  constructor(
    private service: ProductCategoryService,
    private communicator: ProductCategoryCommunicationService
  ) {}

  ngOnInit(): void {
    this.initProductItems();
  }

  initProductItems() {
    this.subscriptions.sink = this.communicator.signal
      .pipe(
        filter(
          (action) =>
            action?.action === GridAction.GridItemClick &&
            action?.payload?.grid === 'ProductCategoryQueueGrid'
        )
      )
      .subscribe((action) => {
        if (action) {
          this.categoryIdSelected = action.payload?.categorySelected;
          this.refreshProductItems();
        }
      });
  }

  refreshProductItems(
    request: GetProductRequest = {
      categoryId: this.categoryIdSelected,
      pageNo: this.pageIndex,
      pageSize: this.pageSize,
    }
  ) {
    this.isLoading = true;
    this.service.getProducts(request).subscribe(
      (items) => {
        if (items) {
          setTimeout(() => {
            this.products = items.data;
            this.pageSize = items.pageSize;
            this.length = items.totalRecords;
            this.pageIndex = items.pageNo;
            this.isLoading = false;
          }, 500);
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  pageChange(event?: PageEvent): void {
    if (event) {
      this.pageIndex = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.length = event.length;
      var request: GetProductRequest = {
        categoryId: this.categoryIdSelected,
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
      };
      this.refreshProductItems(request);
    }
  }

  addCommas(num: number): string {
    if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return num.toString();
    }
  }
}
