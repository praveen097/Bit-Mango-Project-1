import { Component, OnInit } from '@angular/core';
import { Sections } from '../models/sections';
import { Questions} from '../models/questions';
import { CostEstimationService } from '../cost-estimation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questions:Questions[] = [];
  public sections:Sections[] = [];
  priceList:number[] = [];
  currentQuestion:number = 0;
  answerSelected:boolean =  false;
  currentSection:number = 1;
  qid:number = 0;
  selectedRadio:number = 0;
  selectedRadioMax:number = 0;
  presentSection!:Sections;
  presentQuestion!:Questions;
  answersArray!:Questions[];
  sectionEnd:boolean =false;
  constructor(private _costEstimationService: CostEstimationService, private route:Router) { }

  ngOnInit(): void {
    // this.questions = this._costEstimationService.getQuestions();
    // this.sections =  this._costEstimationService.getSections();
    // console.log(this._costEstimationService.getSectionById(2));
    // console.log(this._costEstimationService.getQuestionById(2));
    // console.log(this._costEstimationService.getAnswersOfCurrentSection());
    this.sectionStart();
    
  }
  
  changeSection(){
    this.currentSection++;
    this.sectionStart();
  }
  changeQuestion(){
    
    if(this.currentQuestion == this.presentSection.questionId[0]){
      this._costEstimationService.setAnswerById(this.currentQuestion,[this.selectedRadio]);
    }
    if(!this._costEstimationService.isLastQuestionOfCurrentSection(this.currentQuestion)){
    this.currentQuestion++;
    console.log(this.currentQuestion);
    this._costEstimationService.setAnswerById(this.currentQuestion,[this.selectedRadio]);
    this.presentQuestion = this._costEstimationService.getQuestionById(this.currentQuestion);
    console.log(this.presentQuestion);
    }
    else{
      this.currentSection++;
      this.sectionEnd = true;
      this.sectionAnswers();
    }
  }
  sectionAnswers(){
    console.log("inside");
    const startQuestion = this.presentSection.questionId[0];
    const lastQuestion = this.presentSection.questionId[this.presentSection.questionId.length-1];
    this.answersArray = this._costEstimationService.getAnswersOfCurrentSection(startQuestion,lastQuestion);
    console.log(this.answersArray);
  }
  sectionStart(){
    this.sectionEnd = false;
    this.presentSection = this._costEstimationService.getSectionById(this.currentSection);
    this.currentQuestion = this.presentSection.questionId[0];
    this.presentQuestion = this._costEstimationService.getQuestionById(this.currentQuestion);
  }
  skipSection(){
    this.currentSection++;
    this.sectionEnd = true;
  }
  toOverview(){
    this.route.navigate(['/overview']);
  }
  radioChangeHander(event:any,maxprice:number){
    this.selectedRadio = event.target.value;
    //this.priceList.push(maxprice);
    this.selectedRadioMax = maxprice;
  }
  
}
