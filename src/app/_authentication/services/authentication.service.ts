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

  private isClient = new BehaviorSubject<boolean>(null as unknown as boolean);
  private isStaff = new BehaviorSubject<boolean>(null as unknown as boolean);
  private isManager = new BehaviorSubject<boolean>(null as unknown as boolean);
  isClient$ = this.isClient.asObservable();
  isStaff$ = this.isStaff.asObservable();
  isManager$ = this.isManager.asObservable();

  private isRedirectedToLogin = new BehaviorSubject<boolean>(
    false as unknown as boolean
  );
  isRedirectedToLogin$ = this.isRedirectedToLogin.asObservable();

  constructor() {
    this.isRedirectedToLogin.next(false);
    this.initCurrentUser();
  }

  initCurrentUser() {
    const tokenValidation = this.isValidToken();
    if (!tokenValidation) {
      return;
    }
    var user = this.getUserToken();
    this.updateCurrentUser(user);

    var roles = this.getRoles();
    this.isClient.next(this.isClientRole(roles));
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
    this.updateRoles(user?.roles);
  }

  updateRoles(roles: string) {
    if (roles) {
      if (this.isClientRole(roles)) {
        this.isClient.next(true);
      } else if (this.isStaffRole(roles)) {
        this.isStaff.next(true);
      } else {
        this.isManager.next(true);
      }
    }
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

  isClientRole(roles: string) {
    if (roles.includes('Client')) {
      return true;
    }
    return false;
  }

  isStaffRole(roles: string) {
    if (roles.includes('Staff')) {
      return true;
    }
    return false;
  }

  isManagerRole(roles: string) {
    if (roles.includes('Manager')) {
      return true;
    }
    return false;
  }
}
