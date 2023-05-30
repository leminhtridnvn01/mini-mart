import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

import { SnackBarData } from '../../models/snack-bar-data.model';
import { SnackBarTypeEnum } from '../../enums/snack-bar-type.enum';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
})
export class SnackBarComponent implements OnDestroy {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData,
    private snackBarRef: MatSnackBarRef<SnackBarData>
  ) {}

  close(event: Event): void {
    this.snackBarRef.dismiss();
    event.stopPropagation();
  }

  button(event: Event): void {
    this.snackBarRef.dismissWithAction();
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.snackBarRef.dismiss();
  }

  getIcon(): string {
    switch (this.data.snackType) {
      case SnackBarTypeEnum.Success:
        return 'check_circle_outline';
      case SnackBarTypeEnum.Error:
        return 'error';
      case SnackBarTypeEnum.Warn:
        return 'warning';
      case SnackBarTypeEnum.Info:
        return 'info';
      case SnackBarTypeEnum.WithoutIcon:
        return '';
      default:
        return '';
    }
  }
}
