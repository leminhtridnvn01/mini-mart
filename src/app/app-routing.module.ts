import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveAllService } from './_authentication/services/active-all.service';
import { ActiveManagerService } from './_authentication/services/active-manager-service';
import {
  ActiveOrderService,
  ActiveStaffService,
} from './_authentication/services';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
    canActivate: [ActiveAllService],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
    canActivate: [ActiveAllService],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('../app/product-category/product-category.module').then(
        (m) => m.ProductCategoryModule
      ),
    canActivate: [ActiveAllService],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../app/cart/cart.module').then((m) => m.CartModule),
    canActivate: [ActiveOrderService],
  },
  {
    path: 'order',
    loadChildren: () =>
      import('../app/order/order.module').then((m) => m.OrderyModule),
    canActivate: [ActiveOrderService],
  },
  {
    path: 'product-management',
    loadChildren: () =>
      import(
        '../app/managers/product-management/product-management.module'
      ).then((m) => m.ProductManagementModule),
    canActivate: [ActiveStaffService],
  },
  {
    path: 'revenue-management',
    loadChildren: () =>
      import(
        '../app/managers/revenue-management/revenue-management.module'
      ).then((m) => m.RevenueManagementModule),
    canActivate: [ActiveManagerService],
  },
  {
    path: 'order-management',
    loadChildren: () =>
      import('../app/managers/order-management/order-management.module').then(
        (m) => m.OrderManagementModule
      ),
    canActivate: [ActiveStaffService],
  },
  {
    path: 'promotion-management',
    loadChildren: () =>
      import(
        '../app/managers/promotion-management/promotion-management.module'
      ).then((m) => m.PromotionManagementModule),
    canActivate: [ActiveManagerService],
  },
  {
    path: '**',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
