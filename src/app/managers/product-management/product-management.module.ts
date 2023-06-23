import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import * as Containers from './containers';
import * as Component from './components';
import * as Services from './services';

@NgModule({
  declarations: [Containers.ALL, Component.ALL],
  imports: [CommonModule, ProductManagementRoutingModule, SharedModule],
  providers: [Services.ALL],
})
export class ProductManagementModule {}
