import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import * as Containers from './containers';
import * as Component from './components';
import * as Services from './services';
import { OrderManagementRoutingModule } from './order-management-routing.module';

@NgModule({
  declarations: [Containers.ALL, Component.ALL],
  imports: [CommonModule, OrderManagementRoutingModule, SharedModule],
  providers: [Services.ALL],
})
export class OrderManagementModule {}
