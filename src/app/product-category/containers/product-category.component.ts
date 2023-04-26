import { Component, Input, OnInit } from '@angular/core';
import { ProductCategoryCommunicationService } from '../services/logic/product-category-communicate.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit {
  selectedCategory: number;

  constructor(private communicator: ProductCategoryCommunicationService) {}
  ngOnInit(): void {}

  onSelectedCategoryChange($event: any): number {
    if (!Number($event)) {
      return $event;
    }
    return null;
  }
}
