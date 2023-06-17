import { NgModule, Component } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';

import * as Containers from './containers';
import * as Components from './components';
import * as Services from './services';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [Containers.ALL, Components.ALL],
  providers: [Services.ALL],
})
export class HomeModule {}
