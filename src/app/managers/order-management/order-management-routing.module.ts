import { ActiveManagerService } from './../../_authentication/services/active-manager-service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderManagementComponent } from './containers/order-management/order-management.component';
import { ActiveStaffService } from 'src/app/_authentication/services';

const routes: Routes = [
  {
    path: '',
    component: OrderManagementComponent,
    canActivate: [ActiveStaffService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderManagementRoutingModule {}
