import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromotionManagementService } from '../../services';
import { FormControl } from '@angular/forms';
import { AddStrategyRequest } from '../../models';

@Component({
  selector: 'app-add-strategy-dialog',
  templateUrl: './add-strategy-dialog.component.html',
  styleUrls: ['./add-strategy-dialog.component.css'],
})
export class AddStrategyDialogComponent implements OnInit {
  nameForm: FormControl;
  descriptionForm: FormControl;
  percentDecreasesForm: FormControl;
  activatedDateFromForm: FormControl;
  activatedDateToForm: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    public dialogRef: MatDialogRef<AddStrategyDialogComponent>,
    private service: PromotionManagementService
  ) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.descriptionForm = new FormControl(this.data?.description ?? '');
    this.nameForm = new FormControl(this.data?.name ?? '');
    this.percentDecreasesForm = new FormControl(
      this.data?.percentDecreasesForm ?? ''
    );
    this.activatedDateFromForm = new FormControl(
      this.data?.activatedDateFromForm ?? ''
    );
    this.activatedDateToForm = new FormControl(
      this.data?.activatedDateToForm ?? ''
    );
  }
  onBtnSaveClick() {
    var request: AddStrategyRequest = {
      name: this.nameForm.value ?? '',
      description: this.descriptionForm.value ?? '',
      percentageDecreases: +this.percentDecreasesForm.value ?? 0,
      activatedDateFrom: this.activatedDateFromForm.value ?? new Date(),
      activatedDateTo: this.activatedDateToForm.value ?? new Date(),
    };
    this.service.addStrategy(request).subscribe(
      (item) => {
        if (item) {
          this.dialogRef.close({ hasError: false });
        }
      },
      (error) => {
        this.dialogRef.close({ hasError: true });
      }
    );
  }
}
