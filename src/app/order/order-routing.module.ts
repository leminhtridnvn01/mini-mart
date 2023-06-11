import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './containers/order/order.component';
import { PaymentSuccessComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
