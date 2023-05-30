import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';

import * as Containers from './containers';
import * as Component from './components';
import * as Services from './services';
import { NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [Containers.ALL, Component.ALL],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
  ],
  providers: [Services.ALL],
})
export class CartModule {}
