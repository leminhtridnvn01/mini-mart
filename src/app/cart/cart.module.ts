import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

import * as Containers from './containers';
import * as Component from './components';
import * as Services from './services';

@NgModule({
  declarations: [Containers.ALL, Component.ALL],
  imports: [CommonModule, CartRoutingModule, SharedModule],
  providers: [Services.ALL],
})
export class CartModule {}
