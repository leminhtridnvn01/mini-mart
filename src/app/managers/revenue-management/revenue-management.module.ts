import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import * as Containers from './containers';
import * as Components from './components';
import * as Services from './services';
import { RevenueManagementRoutingModule } from './revenue-management-routing.module';

@NgModule({
  declarations: [Containers.ALL, Components.ALL],
  imports: [CommonModule, RevenueManagementRoutingModule, SharedModule],
  providers: [Services.ALL],
})
export class RevenueManagementModule {}
