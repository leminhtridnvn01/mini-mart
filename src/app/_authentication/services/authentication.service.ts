// Angular
import { Inject, Injectable } from '@angular/core';
import { AuthAction } from 'src/app/common/enums/auth-action';
import { ActionDispatcherBase } from 'src/app/common/models';
import { UserToken } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser = new BehaviorSubject<UserToken>(
    null as unknown as UserToken
  );
  currentUser$ = this.currentUser.asObservable();

  constructor() {}

  updateCurrentUser(user: UserToken) {
    this.currentUser.next(user);
  }
}
