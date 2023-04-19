import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import * as Component from './component';
import * as Module from './modules';

@NgModule({
  declarations: [Component.ALL],
  imports: [CommonModule, SharedRoutingModule, Module.ALL],
  exports: [Component.ALL, Module.ALL],
  providers: [],
})
export class SharedModule {}
