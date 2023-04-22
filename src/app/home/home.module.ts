import { NgModule } from '@angular/core';

import * as Containers from './containers';
import { HomeRoutingModule } from './home-routing.module';
@NgModule({
  imports: [HomeRoutingModule],
  declarations: [Containers.ALL],
  providers: [],
})
export class HomeModule {}
