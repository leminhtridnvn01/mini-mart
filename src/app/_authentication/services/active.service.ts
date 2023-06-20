import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ActiveService implements CanActivate {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  canActivate(): boolean {
    const tokenValidation = this.isValidToken();
    if (tokenValidation) {
      return true;
    } else {
      this.redirectToLogin();
      return false;
    }
  }

  isValidToken(token?: any): boolean {
    const acessToken = this.getAccessToken();
    if (!acessToken) {
      return null;
    }
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(acessToken) ? false : true;
  }

  redirectToLogin() {
    document.location.href = 'https://google.com';
  }

  getAccessToken(): string {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }
}
