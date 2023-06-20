import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ActiveHeaderService implements CanActivate {
  isActive = true;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthenticationService
  ) {
    this.authService.isRedirectedToLogin$.subscribe((item) => {
      if (item) {
        this.isActive = !item;
      }
    });
  }

  canActivate(): boolean {
    return this.isActive;
  }
}
