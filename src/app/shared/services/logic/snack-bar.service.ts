import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { SnackBarComponent } from '../../component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(
    message: string,
    snackType: string,
    button?: string
  ): Observable<any> {
    const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 5000,
      horizontalPosition: 'end',
      data: { message, snackType, button },
    });
    return snackBarRef.afterDismissed();
  }
}
