import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/_authentication/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public authService: AuthenticationService) {}
}
