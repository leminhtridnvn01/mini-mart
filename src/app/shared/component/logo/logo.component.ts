import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})
export class LogoComponent implements OnInit {
  color = 'rgb(94, 53, 177)';
  constructor() {}
  ngOnInit(): void {
    const myDiv = document.getElementsByClassName('container')[0];
    const self = this;
    console.log(myDiv);
    myDiv?.addEventListener('mouseenter', function () {
      self.color = 'white';
    });

    myDiv?.addEventListener('mouseleave', function () {
      self.color = 'rgb(94, 53, 177)';
    });
  }
}
