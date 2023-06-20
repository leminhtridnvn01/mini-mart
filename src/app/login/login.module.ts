import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

import * as Containers from './containers';
import * as Component from './components';
import * as Services from './services';

@NgModule({
  declarations: [Containers.ALL, Component.ALL],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
  providers: [Services.ALL],
})
export class LoginModule {}
