import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ITime } from '@candidosales/material-time-picker/lib/w-clock/w-clock.component';

import { CartService } from '../../services';
import { City } from '../../models/city';
import { Store } from '../../models/store';
import { Order } from '../../models/order';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-dialog-create-order',
  templateUrl: './dialog-create-order.component.html',
  styleUrls: ['./dialog-create-order.component.css'],
})
export class DialogCreateOrderComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();

  exportTime: ITime = { hour: 7, minute: 15, meriden: 'AM', format: 24 };
  pickupTimeFrom: Date;
  pickupTimeTo: Date;
  cities: City[] = [];
  stores: Store[] = [];
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
  isPickup: boolean = false;
  isLoading: boolean = false;

  cityFormControl = new FormControl('', Validators.required);
  storeFormControl = new FormControl('', Validators.required);
  orderTypeFormControl = new FormControl('', Validators.required);
  useNameFormControl = new FormControl('', Validators.maxLength(64));
  addressFormControl = new FormControl('', Validators.required);
  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  time = { hour: 13, minute: 30 };

  constructor(
    private cartService: CartService,
    public dialogRef: MatDialogRef<DialogCreateOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initCities();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }

  initCities() {
    this.cartService.getCities().subscribe((items) => {
      if (items) {
        this.cities = items;
      }
    });
  }

  fetchStores(cityId: number) {
    this.cartService.getStores(cityId).subscribe((items) => {
      if (items) {
        this.stores = items;
      }
    });
  }

  isValidRequest(): boolean {
    if (
      this.cityFormControl.valid &&
      this.storeFormControl.valid &&
      this.orderTypes &&
      this.phoneNumberFormControl.valid &&
      this.addressFormControl.valid
    ) {
      return true;
    }
    return false;
  }

  onSelectCity(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.fetchStores(event.source.value);
    }
  }

  onSelectOrderType(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      if (event.source.value == 1) {
        this.isPickup = true;
      } else {
        this.isPickup = false;
      }
    }
  }

  onChangeHour(event: any) {
    console.log('event', event);
  }

  onChangePickupTimeFrom(event: any) {
    this.pickupTimeFrom = this.convertToDate(event);
  }

  onChangePickupTimeTo(event: any) {
    this.pickupTimeTo = this.convertToDate(event);
  }

  onOrderBtnClick() {
    this.isLoading = true;
    var request: Order = {
      cityId: +this.cityFormControl.value,
      storeId: +this.storeFormControl.value,
      orderType: +this.orderTypeFormControl.value,
      pickupTimeFrom: this.pickupTimeFrom,
      pickupTimeTo: this.pickupTimeTo,
      userName: this.useNameFormControl.value,
      phoneNumber: this.phoneNumberFormControl.value,
      address: this.addressFormControl.value,
      note: this.addressFormControl.value,
      products: this.data?.products,
    };

    this.cartService.addOrder(request).subscribe(
      (item) => {
        if (item) {
          this.isLoading = false;
          this.dialogRef.close(true);
        }
      },
      (error) => {
        this.isLoading = false;
        this.dialogRef.close({ hasError: true });
      }
    );
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
}
