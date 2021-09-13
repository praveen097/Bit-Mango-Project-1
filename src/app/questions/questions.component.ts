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

  //for showing section names and progress bar
  currentQuestion:number = 1;
  sectionNumber:number = 1;
  public sections:Sections[] = [];
  

  constructor(
    private _costEstimationService: CostEstimationService, 
    private route:Router
    ) { }

  ngOnInit(): void {
    this.sections =  this._costEstimationService.getSections();
    this.presentQuestion = this._costEstimationService.getCurrentQuestion();
    this.sectionNumber=this._costEstimationService.currentSectionIndex;
  } 
  
  //store the option selected into answer
  radioChangeHandler(option:Result){
    this.answer = [option];
  }

  toOverview(){
    this.route.navigate(['/overview/'+(this._costEstimationService.currentSectionIndex-1)]);
    this.sectionNumber++;
  }

  next(){
    //check whether option is selected
    if( this.answer.length==0 ){
      Swal.fire('Oops...', 'Please select an option!', 'error')
    }
    else{
      this.currentQuestion++;// used to show question number
      //set current question answer before calling next question
      this._costEstimationService.setAnswerById(this.presentQuestion.qid,this.answer);
      //check if current question is last question of current section
      if(this._costEstimationService.isLastQuestionOfCurrentSection(this.presentQuestion.qid)){
        //check if last section
        if(this._costEstimationService.currentSectionIndex == this._costEstimationService.sections.length-1){
          //if yes, increment current section and call overview
        this._costEstimationService.incrementCurrentSection();
        this.toOverview();
        }
        //get next question and move to overpage
        else{
          this._costEstimationService.getNextQuestion();
          this.toOverview();
        }
      }
      //if not last question, call next question
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
