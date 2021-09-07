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
  currentSectionId:number = 0;
  answers:Questions[] = [];
  questions:Questions[] = questions;
  sections:Sections[] = sections;
  constructor() { }
  getQuestions(){
    return questions;
  }
  getSections(){
    return sections;
  }
  //get question by id
  getSectionById(id:number){
    //return section
    this.currentSectionId = id;
    const currentSection = sections.find((section:Sections)=>{
      return section.sectionID==id;
    })
    return currentSection;
  }

  getQuestionById(id:number){
    console.log(id);
    this.currentQuestionId = id;
    //loop through the questions array and return the question for which id matches
    const currentQuestion = questions.find((question:Questions)=>{
      return question.id==id;
    })
    console.log(currentQuestion);
    return currentQuestion;
  }
  getAnswersOfCurrentSection(startIndex:number, endIndex:number){
    // //find the question ids of the current section
    // const currentSection:Sections = this.getSectionById(this.currentSectionId);
    // const sectionQuestions:number[] = currentSection.questionId;
    // //get the answers from this.answers for the above ids and add them to new array
    // let sectionAnswers:Questions[]=[];
    // console.log(sectionQuestions);
    // sectionQuestions.forEach((questionId)=>{
    //   questions.map((question:Questions)=>{
    //     if(question.id==questionId){
    //       sectionAnswers.push(question);
    //     }
    //   })
    // })
    // //return new array
    // console.log(sectionAnswers);
    // return sectionAnswers; 
    let sectionAnswers:Questions[]=[];
    for(var i=startIndex;i<=endIndex;i++){
      const currentAnswer = this.answers.find((answer:Questions)=>{
        return answer.id == i;
      })
      if(currentAnswer){
        sectionAnswers.push(currentAnswer);
      } 
    }
    return sectionAnswers;
  }

  getNextQuestion(){
    const currentSectionQuestions:number[] = this.getSectionById(this.currentSectionId).questionId
    // currentSectionQuestions = [10,5,7,11]
    // this.currenQuestionId
    if(this.currentQuestionId==currentSectionQuestions[currentSectionQuestions.length-1]){
      const nextSection:Sections = this.getSectionById(this.currentSectionId+1);
      this.currentSectionId = this.currentSectionId+1;
      this.currentQuestionId = nextSection.questionId[0];
    }
      //get the index of current section
      //get the next section
      //set this.currentSectionId = next section id
      //this.currentQuestionId = questions[0] of next section
    else{
      this.currentQuestionId = currentSectionQuestions[currentSectionQuestions.indexOf(this.currentQuestionId)+1]
    }
    //else  
      //this.currentQuestionId = currentSectionQuestions[currentSectionQuestions.indexOf(this.currentQuestionId)+1]
    
    return this.getQuestionById(this.currentQuestionId);
    //

  }
  isLastQuestionOfCurrentSection(id:number){
    const currentSectionQuestions:number[] = this.getSectionById(this.currentSectionId).questionId;
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
    this.answers.push(this.getQuestionById(id))
    this.answers.map((answer)=>{
      if(answer.id==id){
        answer.options = options;
      }
    })
  }

  

}
