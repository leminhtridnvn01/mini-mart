import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services';
import { UpdateDeliveryAddressOrderRequest } from '../../models/update-delevery-info';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';

@Component({
  selector: 'app-dialog-delivery-info',
  templateUrl: './dialog-delivery-info.component.html',
  styleUrls: ['./dialog-delivery-info.component.css'],
})
export class DialogDeliveryInfoComponent implements OnInit {
  isLoading: boolean = false;

  useNameFormControl = new FormControl('', Validators.maxLength(64));
  addressFormControl = new FormControl('', Validators.required);
  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  constructor(
    public orderService: OrderService,
    public dialogRef: MatDialogRef<DialogDeliveryInfoComponent>,
    private snackBarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.useNameFormControl = new FormControl(
      this.data?.userName ?? '',
      Validators.maxLength(64)
    );
    this.addressFormControl = new FormControl(
      this.data?.address ?? '',
      Validators.required
    );
    this.phoneNumberFormControl = new FormControl(
      this.data?.contactPhoneNumber ?? '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
    );
  }

  ngOnInit(): void {}

  isValidRequest(): boolean {
    if (
      this.useNameFormControl &&
      this.phoneNumberFormControl.valid &&
      this.addressFormControl.valid
    ) {
      return true;
    }
    return false;
  }

  onSaveBtnClick() {
    this.isLoading = true;
    var request: UpdateDeliveryAddressOrderRequest = {
      orderId: this.data.orderId,
      deliveryAddress: this.addressFormControl.value,
      userName: this.useNameFormControl.value,
      contactPhoneNumber: this.phoneNumberFormControl.value,
    };
    this.orderService.updateDeliveryAddressOrder(request).subscribe(
      (item) => {
        if (item) {
          this.isLoading = false;
          this.dialogRef.close(true);
        }
      },
      (error) => {
        this.isLoading = false;
        this.snackBarService.openSnackBar(
          'Internal Server Error',
          SNACK_BAR_TYPE.Error
        );
      }
    );
  }
}
