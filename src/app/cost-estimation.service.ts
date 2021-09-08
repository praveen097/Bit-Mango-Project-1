import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Questions } from './models/questions';
import { Sections } from './models/sections';
import questions from './questions.json';
import sections from './sections.json';

@Injectable({
  providedIn: 'root'
})

export class CostEstimationService {
  currentQuestionId:number = 0;
  currentSectionIndex:number = 0;
  answers:Questions[] = [];
  questions:Questions[] = questions;
  sections:Sections[] = sections;
  constructor() { }

  setInitialValues(){
    this.currentSectionIndex =0;
    this.currentQuestionId = this.getSectionByIndex(
    this.currentSectionIndex
    ).questionId[0];
    this.answers = questions.map((question: Questions)=>{
      return {id:question.id, multiple:question.multiple, question:question.question, options:[]}
    });
  }
  //get question by id
  getSectionByIndex(index:number){
    return this.sections[index];
  }

  getCurrentQuestionId():number{
    return this.currentQuestionId;
  }

  getCurrentQuestion(): Questions{
    const currentQuestion = questions.find((question: Questions)=>{
      return question.id == this.currentQuestionId;
    });
    return currentQuestion;
  }
  getQuestionById(id:number){
    const currentQuestion = questions.find((question: Questions)=>{
      return question.id = id;
    });
    return currentQuestion;
  }
  getAnswersOfSectionByIndex(index:number){ 
    let sectionAnswers:Questions[]=[];
    const sectionQuestionList = this.getSectionByIndex(index).questionId;
    for(var i=0; i<this.answers.length;i++){
      if(sectionQuestionList.indexOf(this.answers[i].id)>=0){
        sectionAnswers.push(this.answers[i]);
      }
    }
    return sectionAnswers;
  }

  getNextQuestion(){
    //check if last question of current section
    if(this.isLastQuestionOfCurrentSection(this.currentQuestionId)) {
      //yes ? increment current section index by 1
      this.currentSectionIndex+=1;
      //set current question to starting questions index of next section 
      this.currentQuestionId = this.getSectionByIndex(
      this.currentSectionIndex).questionId[0];
    }else{
      const selectionQuestions = this.getSectionByIndex(this.currentSectionIndex).questionId;
      this.currentQuestionId = selectionQuestions[selectionQuestions.indexOf(this.currentQuestionId)+1];
    }
    
    
    return this.getQuestionById(this.currentQuestionId);
    //

  }
  isLastQuestionOfCurrentSection(id:number){
    const currentSectionQuestions:number[] = this.getSectionByIndex(this.currentSectionIndex).questionId;
    if(currentSectionQuestions.indexOf(id)==currentSectionQuestions.length-1){
      return true;
    }
    else{
      return false;
    }
    //return boolean
  }

  //set answer by id - In the answers array set the options array as the answer submitted by the user
  setAnswerById(id:number, options:any){
    //loop through the answers array and when id matches, overwrite the options in the array element to the options from the parameter
    
    this.answers = this.answers.map((answer)=>{
      if(answer.id==id){
        answer.options = options;
      }
      return answer;
    })
  }

  

}
