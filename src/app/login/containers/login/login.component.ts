import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_authentication/services';
import { environment } from 'src/app/_enviroments/enviroment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLogin: boolean = true;
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private baseUrl = `${environment.webUrl}/api/Account`;
  onLoginBtnClick() {
    var request = {
      userName: (document.getElementById('form2Example11') as HTMLInputElement)
        .value,
      password: (document.getElementById('form2Example22') as HTMLInputElement)
        .value,
    };
    this.fetchApi(request.userName, request.password).subscribe((item) => {
      if (item) {
        if (this.authService.login(item.token, item.username))
          this.router.navigate(['']);
      }
    });
  }

  onRegisterBtnClick() {
    var userName = (
      document.getElementById('formUserNameRegister') as HTMLInputElement
    ).value;
    var password = (
      document.getElementById('formPasswordRegister') as HTMLInputElement
    ).value;
    var name = (document.getElementById('formNameRegister') as HTMLInputElement)
      .value;
    var phoneNumber = (
      document.getElementById('formPhoneNumberRegister') as HTMLInputElement
    ).value;
    this.register(userName, password, name, phoneNumber).subscribe((item) => {
      if (item) {
        if (this.authService.login(item.token, item.username))
          this.router.navigate(['']);
      }
    });
  }

  register(
    userName: string,
    password: string,
    name: string,
    phoneNumber: string
  ) {
    const url = `${this.baseUrl}/Register`;
    var request = {
      email: userName,
      password: password,
      name: name,
      phoneNumber: phoneNumber,
    };
    return this.http.post<UserLogin>(url, request, this.httpOptions);
  }

  fetchApi(userName: string, password: string): Observable<UserLogin> {
    const url = `${this.baseUrl}/Login`;
    var request = {
      userName: userName,
      password: password,
    };
    return this.http.post<UserLogin>(url, request, this.httpOptions);
  }

  onIsLoginClick() {
    this.isLogin = !this.isLogin;
  }
}

export interface UserLogin {
  username: string;
  token: string;
}
