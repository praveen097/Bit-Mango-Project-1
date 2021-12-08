import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonProperties } from 'src/app/models/sections';
import { CostEstimationService } from 'src/app/services/cost-estimation/cost-estimation.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  buttonProperties: ButtonProperties = {
    className: 'navButton',
    buttonText: "Let's Start",
    iconName: '',
    iconClassName: '',
    showIcon: false,
    disabled: false,
  };
  displaySpinner: boolean = false;
  constructor(private _costEstimationService: CostEstimationService, private _route: Router) {}

  async onSubmit(): Promise<void> {
    this.displaySpinner = true;
    await this._costEstimationService.setSectionValues();
    this.displaySpinner = false;
    this._route.navigate(['/questions']);
  }
}
