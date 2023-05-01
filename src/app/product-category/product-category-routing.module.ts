import { NgModule } from '@angular/core';
import { ProductCategoryComponent } from './containers/product-category.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoryComponent,
  },
  {
    path: ':categoryId/product/:productId',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryRoutingModule {}
