import { Component, OnInit } from '@angular/core';
import { Sections } from '../models/sections';
import { Questions,Result} from '../models/questions';
import { CostEstimationService } from '../cost-estimation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  presentQuestion!:Questions;
  answer: Result[] =[];
  currentQuestion:number = 1;
  sectionNumber:number = 1;
  public sections:Sections[] = [];
  

  constructor(private _costEstimationService: CostEstimationService, 
    private route:Router) { }

  ngOnInit(): void {
    this.sections =  this._costEstimationService.getSections();
    this.presentQuestion = this._costEstimationService.getCurrentQuestion();
    this.sectionNumber=this._costEstimationService.currentSectionIndex;
  } 
  
  radioChangeHandler(option:Result){
    this.answer = [option];
  }

  toOverview(){
    this.route.navigate(['/overview/'+(this._costEstimationService.currentSectionIndex-1)]);
    this.sectionNumber++;
  }

  next(){
    if( this.answer.length==0 ){
      Swal.fire('Oops...', 'Please select an option!', 'error')
    }else{
    this.currentQuestion++;
    this._costEstimationService.setAnswerById(this.presentQuestion.qid,this.answer);

    if(this._costEstimationService.isLastQuestionOfCurrentSection(this.presentQuestion.qid)){
      
      if(this._costEstimationService.currentSectionIndex == this._costEstimationService.sections.length-1){
      this._costEstimationService.incrementCurrentSection();
        this.toOverview();
      }
      else{
        this._costEstimationService.getNextQuestion();
      this.toOverview();
      }
    }
    else{
      this.answer = [];
      this.presentQuestion = this._costEstimationService.getNextQuestion();
    }
    }
    
  }

  toResults(){
    this.route.navigate(['/results']);
  }

  
}
