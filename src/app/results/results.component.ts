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
  allAnswer:Questions[] =[];
  showResults:boolean = false;
  resultExist:boolean = true;


  constructor( 
    private _costEstimationService:CostEstimationService,
    private route:Router
  ) { }
  
  ngOnInit(): void {
    this.maxPrice = this._costEstimationService.maxPrice;
    this.minPrice = this._costEstimationService.minPrice;
    this.maxDays = this._costEstimationService.maxDays;
    this.minDays = this._costEstimationService.minDays;

    this.allAnswer = this._costEstimationService.overAllAnswers;
    if(this.allAnswer.length == 0){
     this.resultExist = false;
    }
  }

  toResults(){
    this.showResults = true
  }


}
