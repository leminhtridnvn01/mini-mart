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

@Component({
  selector: 'app-product-queue-grid',
  templateUrl: './product-queue-grid.component.html',
  styleUrls: ['./product-queue-grid.component.css'],
})
export class ProductQueueGridComponent implements OnInit {
  products: GetProductResponse[];
  private subscriptions = new SubSink();
  @Input() selectedCategory: number;

  constructor(
    private service: ProductCategoryService,
    private communicator: ProductCategoryCommunicationService
  ) {}

  ngOnInit(): void {
    // this.initProductItems();
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
          this.refreshProductItems(action.payload?.categorySelected);
        }
      });
  }

  refreshProductItems(categoryId: number) {
    var request: GetProductRequest = {
      categoryId: categoryId,
      pageNo: 1,
      pageSize: 10,
    };
    this.service.getProducts(request).subscribe((items) => {
      if (items) {
        this.products = items.data;
        console.log(this.products);
      }
    });
  }

  addCommas(num: number): string {
    if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return num.toString();
    }
  }
}
