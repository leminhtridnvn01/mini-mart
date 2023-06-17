import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-product-category',
  templateUrl: './sale-product-category.component.html',
  styleUrls: ['./sale-product-category.component.css'],
})
export class SaleProductCategoryComponent implements OnInit {
  selectedCategory: number;

  constructor() {}
  ngOnInit(): void {}

  onSelectedCategoryChange($event: any): number {
    if (!Number($event)) {
      return $event;
    }
    return null;
  }
}
