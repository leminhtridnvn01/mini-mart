import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_authentication/services';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css'],
})
export class HomeSliderComponent {
  constructor(
    private router: Router,
    public authService: AuthenticationService
  ) {}

  onBtnSaleClick() {
    this.router.navigate(['/sale-products']);
  }

  onBtnProductClick() {
    this.router.navigate(['/products']);
  }

  onBtnOrderClick() {
    this.router.navigate(['/order']);
  }

  onBtnCartClick() {
    this.router.navigate(['/cart']);
  }
}
