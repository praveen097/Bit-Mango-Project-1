import { Component } from '@angular/core';
import { Sections } from './models/sections';
import { CostEstimationService } from './services/cost-estimation/cost-estimation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newSections:Sections[] = [];

 constructor(private _costEstimationService: CostEstimationService){

 }
 ngOnInit(){
 this._costEstimationService.setSectionValues();
 }
 ngDoCheck(){
  this.newSections = this._costEstimationService.sectionsData;
 }
}
