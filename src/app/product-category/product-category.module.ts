import { NgModule } from '@angular/core';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { CommonModule } from '@angular/common';

import * as Containers from './containers';
import * as Component from './components';
@NgModule({
  declarations: [Containers.ALL, Component.ALL],
  imports: [CommonModule, ProductCategoryRoutingModule],
  providers: [],
})
export class ProductCategoryModule {}
