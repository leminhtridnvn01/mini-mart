import { NgModule } from '@angular/core';
import { ProductCategoryRoutingModule } from './product-category-routing.module';

import { SharedModule } from '../shared/shared.module';

import * as Containers from './containers';
import * as Component from './components';
import * as Services from './services';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [Containers.ALL, Component.ALL],
  imports: [CommonModule, ProductCategoryRoutingModule, SharedModule],
  providers: [Services.ALL],
})
export class ProductCategoryModule {}
