import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveAllService } from './_authentication/services/active-all.service';
import { ActiveManagerService } from './_authentication/services/active-manager-service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
    canActivate: [ActiveAllService],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('../app/product-category/product-category.module').then(
        (m) => m.ProductCategoryModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../app/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('../app/order/order.module').then((m) => m.OrderyModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'product-management',
    loadChildren: () =>
      import(
        '../app/managers/product-management/product-management.module'
      ).then((m) => m.ProductManagementModule),
    canActivate: [ActiveManagerService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
