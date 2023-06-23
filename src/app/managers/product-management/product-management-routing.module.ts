import { ActiveManagerService } from './../../_authentication/services/active-manager-service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './containers/product-management/product-management.component';

const routes: Routes = [
  {
    path: '',
    component: ProductManagementComponent,
    canActivate: [ActiveManagerService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagementRoutingModule {}
