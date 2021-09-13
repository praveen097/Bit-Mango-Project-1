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
  currentQuestionId: number = 0;
  currentSectionIndex: number = 0;
  answers: Questions[] =[];
  questions: Questions[] = questions;
  sections: Sections[] = sections;
  maxPrice:number = 0;
  minPrice:number = 0;
  maxDays:number = 0;
  minDays:number = 0;
  overAllAnswers:Questions[] = [];

  constructor() { }

  setInitialValues(){
    this.currentSectionIndex = 0;
    this.currentQuestionId = this.getSectionByIndex(
      this.currentSectionIndex
    ).questionId[0];
    this.answers = questions.map((question:Questions)=>{
      return {qid:question.qid, multiple:question.multiple, question:question.question, options:[]}
    });
  }
  getSections(){
    return sections;
  }

  getSectionByIndex(index:number){
    return this.sections[index];
  }

  getCurrentQuestionId():number {
    return this.currentQuestionId;
  }

  getCurrentQuestion():Questions{
    const currentQuestion = questions.find((question:Questions)=>{
      return question.qid == this.currentQuestionId;
    })
    return currentQuestion;
  }

  setAnswerById(id:number, options:any){
    this.answers = this.answers.map((answer)=>{
      if(answer.qid == id){
        answer.options = options;
        for(var i=0;i<answer.options.length;i++){
        this.maxPrice += answer.options[i].maxPrice;
        this.minPrice += answer.options[i].minPrice
        this.maxDays += answer.options[i].maxDays;
        this.minDays += answer.options[i].minDays;
        }
      }
      return answer;
    })
  }

  getQuestionById(id:number){
    const currentQuestion = questions.find((question:Questions)=>{
      return question.qid == id;
    })
    return currentQuestion;
  }

  getNextQuestion():Questions{
    if(this.isLastQuestionOfCurrentSection(this.currentQuestionId)){
    this.currentSectionIndex+=1;
    this.currentQuestionId = this.getSectionByIndex(
      this.currentSectionIndex
    ).questionId[0];

    }else{
      const sectionQuestions = this.getSectionByIndex(this.currentSectionIndex).questionId;
      this.currentQuestionId = sectionQuestions[sectionQuestions.indexOf(this.currentQuestionId)+1];
      
    }

    return this.getQuestionById(this.currentQuestionId);
  }

  isLastQuestionOfCurrentSection(id:number){
    const sectionQuestions = this.getSectionByIndex(
      this.currentSectionIndex
    ).questionId;

    var indexOfCurrentQuestion = sectionQuestions.indexOf(
      this.currentQuestionId
    );
    if(indexOfCurrentQuestion == sectionQuestions.length-1){
      return true;
    }else{
      return false;
    }

  }

  getAnswersOfCurrentSectionByIndex(index:number){
    let sectionAnswers: Questions[] =[];
    const sectionQuestionList = this.getSectionByIndex(index).questionId;
    for(var i=0; i<this.answers.length;i++){
      if(sectionQuestionList.indexOf(this.answers[i].qid)>=0){
        sectionAnswers.push(this.answers[i]);
      }
    }
    this.overAllAnswers.push(...sectionAnswers);
    return sectionAnswers;
  }

  getMaxPrice(){
    return this.maxPrice;
  }
  getMinPrice(){
    return this.minPrice;
  }
  getMaxDays(){
    return this.maxDays;
  }
  getMinDays(){
    return this.minDays;
  }
  incrementCurrentSection(){
    this.currentSectionIndex+=1;
  }


}
