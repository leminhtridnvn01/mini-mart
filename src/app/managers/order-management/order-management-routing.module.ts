import { ActiveManagerService } from './../../_authentication/services/active-manager-service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderManagementComponent } from './containers/order-management/order-management.component';

const routes: Routes = [
  {
    path: '',
    component: OrderManagementComponent,
    canActivate: [ActiveManagerService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderManagementRoutingModule {}
