import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PromotionManagementRoutingModule } from './promotion-management-routing.module';

import * as Containers from './containers';
import * as Component from './components';
import * as Services from './services';

@NgModule({
  declarations: [Containers.ALL, Component.ALL],
  imports: [CommonModule, PromotionManagementRoutingModule, SharedModule],
  providers: [Services.ALL],
})
export class PromotionManagementModule {}
