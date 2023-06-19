// Angular
import { Inject, Injectable } from '@angular/core';
import { AuthAction } from 'src/app/common/enums/auth-action';
import { ActionDispatcherBase } from 'src/app/common/models';
import { UserToken } from '../models';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser = new BehaviorSubject<UserToken>(
    null as unknown as UserToken
  );
  currentUser$ = this.currentUser.asObservable();

  private isRedirectedToLogin = new BehaviorSubject<boolean>(
    false as unknown as boolean
  );
  isRedirectedToLogin$ = this.isRedirectedToLogin.asObservable();

  constructor() {
    this.isRedirectedToLogin.next(false);
  }

  login(token: string, username: string): boolean {
    if (!this.isValidToken(token)) {
      return false;
    }
    localStorage.setItem('accessToken', token);
    var user: UserToken = {
      userName: username,
      accessToken: token,
      roles: this.getRoles(),
    };
    this.updateCurrentUser(user);
    return true;
  }

  updateCurrentUser(user: UserToken) {
    this.currentUser.next(user);
  }

  updateLoginState(isLogin: boolean) {
    this.isRedirectedToLogin.next(isLogin);
  }

  getAccessToken(): string {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }

  isValidToken(token?: any): boolean {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(token) ? false : true;
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
