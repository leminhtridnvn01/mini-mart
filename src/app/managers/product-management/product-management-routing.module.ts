import { ActiveManagerService } from './../../_authentication/services/active-manager-service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './containers/product-management/product-management.component';
import { ActiveStaffService } from 'src/app/_authentication/services';

const routes: Routes = [
  {
    path: '',
    component: ProductManagementComponent,
    canActivate: [ActiveStaffService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagementRoutingModule {}
