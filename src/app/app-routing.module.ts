import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
