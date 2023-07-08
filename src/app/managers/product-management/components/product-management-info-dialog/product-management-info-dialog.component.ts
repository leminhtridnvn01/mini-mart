import { Component, OnInit, Inject } from '@angular/core';
import { ProductLocation } from 'src/app/product-category/models/product-location';
import { ProductManagementService } from '../../services/http/product-management.service';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { GetCategoryResponse } from 'src/app/product-category/models/GetAllCategories';
import { LK_ProductUnit } from 'src/app/product-category/enums/product-unit';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CreateProductToOrderRequest,
  EditProductToOrderRequest,
} from '../../models';

@Component({
  selector: 'app-product-management-info-dialog',
  templateUrl: './product-management-info-dialog.component.html',
  styleUrls: ['./product-management-info-dialog.component.css'],
})
export class ProductManagementInfoDialogComponent implements OnInit {
  locations: ProductLocation[];
  locationForm: FormControl;

  storeIds: number[] = [];
  categories: GetCategoryResponse[];
  categoyForm: FormControl;

  productUnit: ProductUnit[] = [];
  productUnitForm: FormControl;

  descriptionForm: FormControl;
  nameForm: FormControl;
  priceForm: FormControl;
  priceDecreasesForm: FormControl;
  currentPriceDecreasesForm: FormControl;
  quantityForm: FormControl;

  productImageAttachment: File;

  productId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProductManagementInfoDialogComponent>,
    private productManagementService: ProductManagementService
  ) {}

  ngOnInit(): void {
    this.initLocations();
    this.initCategories();
    this.initForm();
  }

  initForm() {
    this.productUnit = this.enumToArray(LK_ProductUnit);
    this.locationForm = new FormControl('');
    this.categoyForm = new FormControl(this.data?.categoryId ?? '');
    this.productUnitForm = new FormControl(this.data?.productUnit ?? '');
    this.descriptionForm = new FormControl(this.data?.description ?? '');
    this.nameForm = new FormControl(this.data?.name ?? '');
    this.priceForm = new FormControl(this.data?.price ?? '');
    this.priceDecreasesForm = new FormControl(this.data?.priceDecreases ?? '');
    this.currentPriceDecreasesForm = new FormControl(
      this.data?.currentPriceDecreases ?? ''
    );
    this.quantityForm = new FormControl(this.data?.quantity ?? '');
    this.productId = this.data?.productId;
  }

  initLocations() {
    this.productManagementService.getMyStoreLocations().subscribe((item) => {
      if (item) {
        this.locations = item;
      }
    });
  }

  initCategories() {
    this.productManagementService.getAllCategories().subscribe((result) => {
      if (result) {
        this.categories = result.data;
      }
    });
  }

  onSelectLocation(event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.storeIds.push(event.source.value);
      } else {
        this.storeIds = this.storeIds.filter(
          (item) => item != +event.source.value
        );
      }
    }
  }

  onUploadImageChange(event: any) {
    if (event) {
      this.productImageAttachment = event.target.files[0];
    }
  }

  onBtnSaveClick() {
    if (this.data?.isEdit) {
      var requestEdit: EditProductToOrderRequest = {
        productId: this.productId,
        name: this.nameForm.value ?? '',
        description: this.descriptionForm.value ?? '',
        categoryId: this.categoyForm.value ?? 1,
        lK_ProductUnit: this.productUnitForm.value ?? 0,
        price: this.priceForm.value,
        priceDecreases: this.priceDecreasesForm.value,
        currentPriceDecreases: this.currentPriceDecreasesForm.value,
        storeId: this.data?.storeId,
        quantity: this.quantityForm.value,
        img: this.productImageAttachment,
      };
      this.productManagementService.editProduct(requestEdit).subscribe(
        (item) => {
          if (item) {
            this.dialogRef.close({ hasError: false });
          }
        },
        (error) => {
          this.dialogRef.close({ hasError: true });
        }
      );
    } else {
      var requestCreate: CreateProductToOrderRequest = {
        name: this.nameForm.value ?? '',
        description: this.descriptionForm.value ?? '',
        categoryId: this.categoyForm.value ?? 1,
        lK_ProductUnit: this.productUnitForm.value ?? 0,
        price: this.priceForm.value,
        priceDecreases: this.priceDecreasesForm.value,
        storeIds: this.storeIds,
        img: this.productImageAttachment,
      };
      this.productManagementService.createProduct(requestCreate).subscribe(
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

  enumToArray(enumObject: any): ProductUnit[] {
    return Object.keys(enumObject)
      .filter((key) => isNaN(Number(enumObject[key])))
      .map((key) => ({ name: enumObject[key], id: +key }));
  }
}

export interface ProductUnit {
  id: number;
  name: string;
}
