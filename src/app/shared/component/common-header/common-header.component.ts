import { SharedService } from './../../services/http/shared.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { GetProductRequest } from 'src/app/product-category/models/get-product';
import { GridAction } from '../../../common/enums/grid-action';
import { SubSink } from '../../models';
import { filter } from 'rxjs';
import { CommonCommunicationService } from 'src/app/common/services';
import { AuthenticationService } from 'src/app/_authentication/services';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.css'],
})
export class CommonHeaderComponent {
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  isLogin = true;
  isShowMenuBtn = true;

  private subscriptions = new SubSink();

  constructor(
    private _formBuilder: FormBuilder,
    private communicator: CommonCommunicationService,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event) {
          if ((event as NavigationEnd).url.includes('login')) {
            this.isLogin = true;
          } else {
            this.isLogin = false;
          }
        }
      });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onClickSearchBtn() {
    var input = document.getElementById('search-input') as HTMLInputElement;
    if (input.value) {
      this.communicator.send(GridAction.GridItemClick, {
        grid: 'ProductSearchQueueGrid',
        search: input.value,
      });
    }
  }

  onOpenedChange(event: boolean) {
    this.isShowMenuBtn = !event;
  }
}
