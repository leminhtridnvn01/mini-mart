import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LK_OrderStatus } from 'src/app/order/enums/order-status';

@Component({
  selector: 'app-order-status-info-dialog',
  templateUrl: './order-status-info-dialog.component.html',
  styleUrls: ['./order-status-info-dialog.component.css'],
})
export class OrderStatusInfoDialogComponent implements OnInit {
  // orderStatus = LK_OrderStatus;
  orderStatusForm: FormControl;
  orderStatus: OrderStatus[];

  constructor(
    public dialogRef: MatDialogRef<OrderStatusInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.orderStatus = this.enumToArray(LK_OrderStatus);
    this.orderStatusForm = new FormControl(this.data?.orderStatus ?? '');
  }

  onBtnSaveClick() {}

  enumToArray(enumObject: any): OrderStatus[] {
    return Object.keys(enumObject)
      .filter((key) => isNaN(Number(enumObject[key])))
      .map((key) => ({ name: enumObject[key], id: +key }));
  }
}

export interface OrderStatus {
  id: number;
  name: string;
}
