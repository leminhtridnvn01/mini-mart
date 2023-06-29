import { UpdateOrderTypeRequest } from './../../models/update-order-type';
import { LK_OrderType } from './../../enums/order-type';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services';
import { Order, OrderParrent } from '../../models/order';
import { GetOrderRequest } from '../../models/get-order-request';
import {
  AbstractControl,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeliveryInfoComponent } from '../../components';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { ITime } from '@candidosales/material-time-picker/lib/w-clock/w-clock.component';
import { MatOptionSelectionChange } from '@angular/material/core';
import { UpdatePaymentMethodRequest } from '../../models/update-payment-method';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderInfo } from '../../models/order-info';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  tabLabels = [
    // {
    //   index: 1,
    //   value: 'Waiting For Payment',
    // },
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
  orderTypes = [
    {
      value: 1,
      viewValue: 'Pick-up',
    },
    {
      value: 2,
      viewValue: 'Delivery',
    },
  ];
  paymentMethods = [
    {
      value: 1,
      viewValue: 'Cash',
    },
    {
      value: 2,
      viewValue: 'Online Payment',
    },
  ];
  currentTabIndex = 1;
  orders: Order[] = [];
  orderParrents: OrderParrent[] = [];
  isPickup: boolean = false;
  exportTime: ITime = { hour: 7, minute: 15, meriden: 'AM', format: 24 };

  orderTypeFormControl = new FormControl('', Validators.required);
  orderTypeForms: FormArray;
  paymentMethodFormControl = new FormControl('', Validators.required);
  paymentMethodForms: FormArray;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initOrder();
  }

  initOrder() {
    // this.refreshOrder();
    this.refreshOrderWaitingForPaymment();
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
        // console.log(this.orders);
        // this.orderTypeForms = new FormArray([]);
        // this.paymentMethodForms = new FormArray([]);
        // this.orders.forEach((order) => {
        //   this.orderTypeForms.push(
        //     new FormControl(order.orderType, Validators.required)
        //   );
        //   this.paymentMethodForms.push(
        //     new FormControl(order.paymentMethod, Validators.required)
        //   );
        // });
      }
    });
  }

  refreshOrderWaitingForPaymment() {
    let request: GetOrderRequest = {
      orderStatus: this.currentTabIndex,
      pageNo: 1,
      pageSize: 5,
    };
    this.orderService.getOrdersWaitingForPayment(request).subscribe((items) => {
      if (items) {
        this.orderParrents = items;
        this.orderTypeForms = new FormArray([]);
        this.paymentMethodForms = new FormArray([]);
        this.orderParrents.forEach((OrderParrent) => {
          this.paymentMethodForms.push(
            new FormControl(OrderParrent.paymentMethod, Validators.required)
          );
        });
      }
    });
  }

  onSelectTab(event: any) {
    this.currentTabIndex = event + 1;
    if (this.currentTabIndex == 1) {
    } else {
      this.refreshOrder();
    }
  }

  onEditBtnClick(order: Order): void {
    this.dialog
      .open(DialogDeliveryInfoComponent, {
        data: {
          orderId: order.orderId,
          userName: order.userName,
          address: order.deliveryAddress,
          contactPhoneNumber: order.contactPhoneNumber,
        },
        disableClose: false,
        width: '600px',
      })
      .afterClosed()
      .subscribe(
        (afterClosedData) => {
          if (!afterClosedData) return;

          if (afterClosedData.hasError) {
            this.snackBarService.openSnackBar(
              'Update Delivery Information fail!, Try again.',
              SNACK_BAR_TYPE.Error
            );
            return;
          }

          this.snackBarService.openSnackBar(
            'Your Delivery Information has been updated',
            SNACK_BAR_TYPE.Success
          );
        },
        (error) => {
          this.snackBarService.openSnackBar(
            'Internal Server Error',
            SNACK_BAR_TYPE.Error
          );
        }
      );
  }

  onBtnOrderClick(OrderParrent: OrderParrent): void {
    var request: OrderInfo = {
      orderParrentId: OrderParrent.orderParrentId,
    };
    this.orderService.pay(request).subscribe(
      (item) => {
        if (item) {
          window.location.href = item.url;
        }
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Internal Server Error',
          SNACK_BAR_TYPE.Error
        );
      }
    );
  }

  onChangePickupTimeFrom(event: any, order: Order) {
    order.pickupTimeFrom = this.convertToDate(event);
  }

  onChangePickupTimeTo(event: any, order: Order) {
    order.pickupTimeTo = this.convertToDate(event);
  }

  onSelectOrderType(event: MatOptionSelectionChange, order: Order) {
    if (event.isUserInput) {
      order.orderType = +event.source.value;
      var request: UpdateOrderTypeRequest = {
        orderId: order.orderId,
        lK_OrderType: order.orderType,
      };
      this.orderService.updateOrderType(request).subscribe((item) => {
        if (item) {
        }
      });
    }
  }

  onSelectPaymentMethod(event: MatOptionSelectionChange, order: Order) {
    // if (event.isUserInput) {
    //   order.paymentMethod = +event.source.value;
    //   var request: UpdatePaymentMethodRequest = {
    //     orderId: order.orderId,
    //     lK_PaymentMethod: order.paymentMethod,
    //   };
    //   this.orderService.updatePaymentMethod(request).subscribe((item) => {
    //     if (item) {
    //     }
    //   });
    // }
  }

  onSelectPaymentMethodForOrderParrent(
    event: MatOptionSelectionChange,
    orderParrent: OrderParrent
  ) {
    if (event.isUserInput) {
      orderParrent.paymentMethod = +event.source.value;
      var request: UpdatePaymentMethodRequest = {
        orderParrentId: orderParrent.orderParrentId,
        lK_PaymentMethod: orderParrent.paymentMethod,
      };
      this.orderService.updatePaymentMethod(request).subscribe((item) => {
        if (item) {
        }
      });
    }
  }

  //private function
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

  convertToITime(date: Date): ITime {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return { hour: hours, minute: minutes, meriden: 'PM', format: 24 };
  }

  convertToDate(time: ITime): Date {
    const date: Date = new Date();
    date.setHours(time.hour);
    date.setMinutes(time.minute);
    return date;
  }

  toControl(absCtrl: AbstractControl): FormControl {
    return absCtrl as FormControl;
  }
}
