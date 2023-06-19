import { UserToken } from './../models/user-token';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActiveService } from './active.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveOrderService implements CanActivate {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const tokenValidation = this.isValidToken();

    if (!tokenValidation) {
      this.redirectToLogin();
      return false;
    }

    var user = this.getUserToken();
    this.authService.updateCurrentUser(user);

    var roles = this.getRoles();
    return this.isClient(roles);
  }

  getAccessToken(): string {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
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
    this.authService.updateLoginState(true);
    this.router.navigate(['login']);
  }

  getRoles() {
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(this.getAccessToken());
    return decodedToken?._roles ?? '';
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

  isClient(roles: string) {
    if (roles.includes('Client')) {
      return true;
    }
    return false;
  }
}
