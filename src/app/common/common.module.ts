import { NgModule } from '@angular/core';

// import * as Component from './component';
import * as Module from './modules';
import * as Services from './services';
import { CommonRoutingModule } from './common-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonRoutingModule, Module.ALL],
  exports: [Module.ALL],
  providers: [Services.ALL],
})
export class SharedModule {}
