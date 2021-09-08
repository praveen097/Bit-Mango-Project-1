import { Component, OnInit } from '@angular/core';
import { Sections } from '../models/sections';
import { Questions,Result} from '../models/questions';
import { CostEstimationService } from '../cost-estimation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  presentQuestion!:Questions;
  answer: Result[]=[];
  

  constructor(private _costEstimationService: CostEstimationService, 
    private route:Router) { }

  ngOnInit(): void {
    this.presentQuestion = this._costEstimationService.getCurrentQuestion();
    
  }  
  

  //Navigate to over view page
  toOverviewPage(){
    this.route.navigate(['/overview'+(this._costEstimationService.currentSectionIndex-1)]);
  }
  
  radioChangeHandler(option:Result){
    this.answer = [option];
  }
  next(){
    this._costEstimationService.setAnswerById(this.presentQuestion.id, this.answer);
    //check if this is the last question of current section
    if(this._costEstimationService.isLastQuestionOfCurrentSection(this.presentQuestion.id)){
    this._costEstimationService.getNextQuestion();
    this.toOverviewPage();
    }
    else{
      this.answer = [];
      this.presentQuestion = this._costEstimationService.getNextQuestion();
    }
  }
  
}
