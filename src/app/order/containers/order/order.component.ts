import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services';
import { Order } from '../../models/order';
import { GetOrderRequest } from '../../models/get-order-request';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  tabLabels = [
    {
      index: 1,
      value: 'Waiting For Payment',
    },
    {
      index: 2,
      value: 'Waiting For Delivery/Pickup',
    },
    {
      index: 3,
      value: 'Delivery/Pickup cancled',
    },
    {
      index: 4,
      value: 'Completed',
    },
    {
      index: 5,
      value: 'Rejected for Payment',
    },
  ];

  currentTabIndex = 1;

  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.initOrder();
  }

  initOrder() {
    this.refreshOrder();
  }

  refreshOrder() {
    let request: GetOrderRequest = {
      orderStatus: this.currentTabIndex,
      pageNo: 1,
      pageSize: 5,
    };
    this.orderService.getOrders(request).subscribe((items) => {
      if (items) {
        this.orders = items.data;
        console.log(this.orders);
      }
    });
  }

  onSelectTab(event: any) {
    this.currentTabIndex = event + 1;
    this.refreshOrder();
  }

  addCommas(num: number): string {
    if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return num.toString();
    }
  }

  formatMoney(amount: number): string {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
}
