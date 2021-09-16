import { Component, OnInit } from '@angular/core';
import { Sections } from '../models/sections';
import { Questions,Result} from '../models/questions';
import { CostEstimationService } from '../services/cost-estimation.service';
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

  cont:boolean = false;
  

  constructor(
    private _costEstimationService: CostEstimationService, 
    private route:Router
    ) { }

  ngOnInit(): void {
    this.sections =  this._costEstimationService.getSections();
    this.sectionNumber=this._costEstimationService.currentSectionIndex;
    console.log("current section Index is ",this._costEstimationService.currentSectionIndex);
  } 
  
  //store the option selected into answer
  radioChangeHandler(option:Result): void {
    this.answer = [option];
  }

  continue(): void {
    this.presentQuestion = this._costEstimationService.getCurrentQuestion();
    this.cont = true;
  }
  skipSection(): void {
    if(this.sectionNumber<this._costEstimationService.sections.length-1){
    this.sectionNumber++;
    this._costEstimationService.skipSection();
    }
    else{
      this.route.navigate(['/results']);
    }
  }

  toOverview(): void {
    this.route.navigate(['/overview/'+(this._costEstimationService.currentSectionIndex-1)]);
    this.sectionNumber++;
  }

  next(): void {
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
        else{// 1 2 3
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

  toResults(): void {
    this.route.navigate(['/results']);
  }

}
