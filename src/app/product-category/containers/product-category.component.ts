import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit {
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
