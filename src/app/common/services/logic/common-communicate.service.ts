import { Injectable } from '@angular/core';
import { GridAction } from 'src/app/common/enums/grid-action';
import { ActionDispatcherBase } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CommonCommunicationService extends ActionDispatcherBase<GridAction> {
  constructor() {
    super();
  }
}
