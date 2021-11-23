import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  buttonProperties = {
    className: 'navButton',
    buttonText: "Let's Start",
    iconName: '',
  };
  constructor(private _route: Router) {}

  ngOnInit(): void {}
  onSubmit(): void {
    this._route.navigate(['/questions']);
  }
}
