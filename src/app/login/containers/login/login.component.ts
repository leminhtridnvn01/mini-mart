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

  fetchApi(userName: string, password: string): Observable<UserLogin> {
    const url = `${this.baseUrl}/Login`;
    var request = {
      userName: userName,
      password: password,
    };
    return this.http.post<UserLogin>(url, request, this.httpOptions);
  }
}

export interface UserLogin {
  username: string;
  token: string;
}
