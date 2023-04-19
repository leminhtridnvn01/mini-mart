import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Containers from './containers';
import { HomeRoutingModule } from './home-routing.module';
@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [Containers.ALL],
  providers: [],
})
export class HomeModule {}
