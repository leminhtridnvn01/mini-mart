import { ProductForOrder } from './../../models/order';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/services/logic/snack-bar.service';
import { DialogCreateOrderComponent } from '../dialog-create-order/dialog-create-order.component';
import { SNACK_BAR_TYPE } from 'src/app/shared/constants/snack-bar-type.constant';
import { ProductInCart } from '../../models/product-in-cart';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.css'],
})
export class CartFooterComponent {
  @Input() products: ProductInCart[] = [];

  constructor(
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}
  onPayBtnClick() {
    var selectedProducts = this.products
      .filter((x) => x.isSelected)
      .map((x) => ({
        productId: x.id,
        quantity: x.quantity,
      }));
    this.dialog
      .open(DialogCreateOrderComponent, {
        data: {
          products: selectedProducts,
          queueType: '',
        },
        disableClose: false,
        width: '1400px',
      })
      .afterClosed()
      .subscribe((afterClosedData) => {
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
      });
  }
}
