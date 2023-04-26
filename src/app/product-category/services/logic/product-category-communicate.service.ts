import { Injectable } from '@angular/core';
import { GridAction } from 'src/app/shared/enums/grid-action';
import { ActionDispatcherBase } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryCommunicationService extends ActionDispatcherBase<GridAction> {
  constructor() {
    super();
  }
}
