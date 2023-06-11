import { ProductForOrder } from './../../models/order';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { DialogCreateOrderComponent } from '../dialog-create-order/dialog-create-order.component';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';
import { ProductInCart } from '../../models/product-in-cart';
import { CommonCommunicationService } from 'src/app/common/services';
import { SubSink } from 'src/app/shared/models';
import { GridAction } from 'src/app/common/enums/grid-action';
import { filter } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.css'],
})
export class CartFooterComponent implements OnInit {
  @Input() products: ProductInCart[] = [];
  @Input() selectedProductsCount = 0;
  @Input() selectedProducsTotalPrice = 0;

  private subscriptions = new SubSink();

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private communicator: CommonCommunicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.initSelectedItemInfo();
  }

  // initSelectedItemInfo(): void {
  //   this.subscriptions.sink = this.communicator.signal
  //     .pipe(
  //       filter(
  //         (action) =>
  //           action?.action === GridAction.GridItemClick &&
  //           action?.payload?.grid === 'SelectedItemsInCart'
  //       )
  //     )
  //     .subscribe((action) => {
  //       if (action?.payload?.grid) {
  //         switch (action.payload?.grid) {
  //           case 'SelectedProductsInCart':
  //             var selectedProducts = this.products.filter((x) => x.isSelected);
  //             this.selectedProductsCount = selectedProducts.length;
  //             this.selectedProducsTotalPrice = selectedProducts
  //               .map((x) => x.quantity * x.priceDecreases ?? x.price)
  //               .reduce((pre, cur) => pre + cur, 0);
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     });
  // }

  isInvalidCreateOrder(): boolean {
    if (this.products == null) return true;
    var selectedProducts = this.products
      .filter((x) => x.isSelected)
      .map((x) => ({
        productId: x.id,
        storeId: x.storeId,
        quantity: x.quantity,
      }));
    if (selectedProducts.length == 0) return true;
    return false;
  }

  onCreateOrderBtnClick() {
    var selectedProducts = this.products
      .filter((x) => x.isSelected)
      .map((x) => ({
        productId: x.id,
        storeId: x.storeId,
        quantity: x.quantity,
      }));
    this.dialog
      .open(DialogCreateOrderComponent, {
        data: {
          products: selectedProducts,
          queueType: '',
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
              'Your order fail to create',
              SNACK_BAR_TYPE.Error
            );
            return;
          }

          this.snackBarService.openSnackBar(
            'Your order has been created',
            SNACK_BAR_TYPE.Success
          );
        },
        (error) => {
          this.snackBarService.openSnackBar(
            'Internal Server Error',
            SNACK_BAR_TYPE.Error
          );
        },
        () => {
          this.router.navigate(['/order']);
        }
      );
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
