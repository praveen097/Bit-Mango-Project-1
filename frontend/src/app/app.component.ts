import { Component, DoCheck, OnInit } from '@angular/core';
import { Sections } from './models/sections';
import { CostEstimationService } from './../app/services/cost-estimation/cost-estimation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  sections:Sections[] = [];

 constructor(private _costEstimationService: CostEstimationService){

 }
 ngOnInit(){
 this._costEstimationService.setSectionValues();
 }
 ngDoCheck(){
  this.sections = this._costEstimationService.sectionsData;
 }
}
