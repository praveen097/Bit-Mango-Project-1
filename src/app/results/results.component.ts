import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../cost-estimation.service';
import { Questions } from '../models/questions';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  minPrice:number = 0;
  maxPrice:number = 0;
  minDays:number = 0;
  maxDays:number = 0;
  answers1:Questions[]=[];


  constructor( 
    private _costEstimationService:CostEstimationService,
    private route:Router
  ) { }
  
  ngOnInit(): void {
    this.maxPrice = this._costEstimationService.getMaxPrice();
    this.minPrice = this._costEstimationService.getMinPrice();
    this.maxDays = this._costEstimationService.getMaxDays();
    this.minDays = this._costEstimationService.getMinDays();
  }

}
