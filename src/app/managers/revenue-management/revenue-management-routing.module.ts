import { ActiveManagerService } from './../../_authentication/services/active-manager-service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenueManagementComponent } from './containers/revenue-management/revenue-management.component';

const routes: Routes = [
  {
    path: '',
    component: RevenueManagementComponent,
    canActivate: [ActiveManagerService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevenueManagementRoutingModule {}
