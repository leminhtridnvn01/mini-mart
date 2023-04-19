import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'product-category',
    loadChildren: () =>
      import('../app/product-category/product-category.module').then(
        (m) => m.ProductCategoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
