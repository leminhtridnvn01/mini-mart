import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css'],
})
export class HomeSliderComponent {
  constructor(private router: Router) {}

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
