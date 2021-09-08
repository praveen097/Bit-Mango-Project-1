import { Component } from '@angular/core';
import { CostEstimationService } from './cost-estimation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'costEstimator';

  constructor(private _costEstimationService:CostEstimationService){}

  ngOnInit(){
    this._costEstimationService.setInitialValues();
  }
}
