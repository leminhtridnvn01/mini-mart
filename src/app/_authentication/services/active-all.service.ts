import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ActiveAllService implements CanActivate {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthenticationService
  ) {}

  canActivate(): boolean {
    var user = this.getUserToken();
    this.authService.updateCurrentUser(user);
    return true;
  }

  getUserToken(): UserToken {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(this.getAccessToken());
    if (!decodedToken) {
      return null;
    }
    var user: UserToken = {
      accessToken: this.getAccessToken(),
      userName: decodedToken._name,
      roles: decodedToken._roles,
    };
    return user;
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
