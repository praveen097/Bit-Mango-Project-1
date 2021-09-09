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
  answer: Result[] =[];

  constructor(private _costEstimationService: CostEstimationService, 
    private route:Router) { }

  ngOnInit(): void {
    this.presentQuestion = this._costEstimationService.getCurrentQuestion();
  }  
  

  radioChangeHandler(option:Result){
    this.answer = [option];
  }

  toOverview(){
    this.route.navigate(['/overview/'+(this._costEstimationService.currentSectionIndex-1)]);
  }

  next(){
    this._costEstimationService.setAnswerById(this.presentQuestion.qid,this.answer);
    if(this._costEstimationService.isLastQuestionOfCurrentSection(this.presentQuestion.qid)){
      this._costEstimationService.getNextQuestion();
      this.toOverview();
    }
    else{
      this.answer = [];
      this.presentQuestion = this._costEstimationService.getNextQuestion();
    }
  }
  
}
