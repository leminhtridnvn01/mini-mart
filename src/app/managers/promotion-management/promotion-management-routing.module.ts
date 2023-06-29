import { ActiveManagerService } from './../../_authentication/services/active-manager-service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromotionManagementComponent } from './containers/promotion-management/promotion-management.component';

const routes: Routes = [
  {
    path: '',
    component: PromotionManagementComponent,
    canActivate: [ActiveManagerService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionManagementRoutingModule {}
