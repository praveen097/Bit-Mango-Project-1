import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonProperties } from 'src/app/models/sections';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Output() buttonProperties: ButtonProperties = {
    className: 'navButton',
    buttonText: "Let's Start",
    iconName: '',
    iconClassName: '',
    showIcon: false,
    disabled: false,
  };
  constructor(private _route: Router) {}

  ngOnInit(): void {}
  onSubmit(): void {
    this._route.navigate(['/questions']);
  }
}
