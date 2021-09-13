import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../cost-estimation.service';
import { ActivatedRoute } from '@angular/router';
import { Questions } from '../models/questions';
import { Sections } from '../models/sections';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  sectionRoute: string | null ='';
  sectionIndex:number = 0;
  answers:Questions[] = [];
  public sections:Sections[] = [];
  details:boolean=false;
  basket:boolean = false;
  isLastSection:boolean = false;

  minPrice:number = 0;
  maxPrice:number = 0;
  minDays:number = 0;
  maxDays:number = 0;

  allAnswer:Questions[] =[];


  constructor(
    private _costEstimationService:CostEstimationService,
    private route:Router,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('index')){
    this.sectionRoute = this.activatedRoute.snapshot.paramMap.get('index');
    this.sectionIndex = this.sectionRoute ? parseInt(this.sectionRoute) : 0;
    this.answers = this._costEstimationService.getAnswersOfCurrentSectionByIndex(this.sectionIndex);
    this.sections =  this._costEstimationService.getSections();

    this.maxPrice = this._costEstimationService.maxPrice;
    this.minPrice = this._costEstimationService.minPrice;
    this.maxDays = this._costEstimationService.maxDays;
    this.minDays = this._costEstimationService.minDays;

    this.allAnswer = this._costEstimationService.overAllAnswers;
    
    if(this.sectionIndex == this._costEstimationService.sections.length-1){
      this.isLastSection= true;
    }
      
    }else{
      console.log("No index passed from URL!")
    }
  }
  //setting last section overview to summary
  summary(){
    this.answers=this.allAnswer;
  }

  //for detailed answer
  toggle(){
    this.details = !this.details;
  }

  showBasket(){
    this.basket = !this.basket;
  }

  toQuestions(){
    this.route.navigate(['/questions']);
  }
  toresults(){
    this.route.navigate(['/results']);
  }

  
  
}
