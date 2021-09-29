import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Questions, Result } from '../models/questions';
import { Sections } from '../models/sections';
import questions from '../data/questions.json';
import sections from '../data/sections.json';
@Injectable({
  providedIn: 'root',
})
export class CostEstimationService {
  currentQuestionId: number = 0;
  currentSectionIndex: number = 0;
  answers: Questions[] = [];
  questions: Questions[] = questions;
  sections: Sections[] = sections;
  maxPrice: number = 0;
  minPrice: number = 0;
  maxDays: number = 0;
  minDays: number = 0;
  overAllAnswers: Questions[] = [];
  constructor() {}
  setInitialValues() {
    this.currentSectionIndex = 0;
    this.currentQuestionId = this.getSectionByIndex(
      this.currentSectionIndex
    ).questionId[0];
    this.answers = questions.map((question: Questions) => {
      return {
        qid: question.qid,
        multiple: question.multiple,
        question: question.question,
        options: [],
      };
    });
  }
  getSections() {
    return sections;
  }
  getSectionByIndex(index: number) {
    return this.sections[index];
  }
  getCurrentQuestionId(): number {
    return this.currentQuestionId;
  }
  getCurrentQuestion(): Questions {
    //if qid matches with current question id, then return that question
    const currentQuestion = questions.find((question: Questions) => {
      return question.qid == this.currentQuestionId;
    });
    return currentQuestion;
  }
  setAnswerById(id: number, options: any) {
    let answerIndex = this.overAllAnswers.findIndex((answer) => answer.qid == id);
    if (answerIndex == -1) {
      let questionTemplate = this.getQuestionById(id);
      const question = JSON.parse(JSON.stringify(questionTemplate));
      question.options = options;
      this.overAllAnswers.push(JSON.parse(JSON.stringify(question)));
    } else {
      this.overAllAnswers[answerIndex].options = options;
    }
    //map through the answers array
    this.answers = this.answers.map((answer) => {
      //check if qid matches with the id passesed as parameter
      if (answer.qid == id) {
        //set options in the answer array to option passed in the parameter
        answer.options = options;
        for (var i = 0; i < answer.options.length; i++) {
          this.maxPrice += answer.options[i].maxPrice;
          this.minPrice += answer.options[i].minPrice;
          this.maxDays += answer.options[i].maxDays;
          this.minDays += answer.options[i].minDays;
        }
      }
      return answer;
    });
  }
  getQuestionById(id: number) {
    const currentQuestion = questions.find((question: Questions) => {
      return question.qid == id;
    });
    return currentQuestion;
  }
  getNextQuestion(): Questions {
    //check if this is the last question of current section
    if (this.isLastQuestionOfCurrentSection(this.currentQuestionId)) {
      //increment current section as we need next section
      this.currentSectionIndex += 1;
      //set current question id to first index of next section
      this.currentQuestionId = this.getSectionByIndex(
        this.currentSectionIndex
      ).questionId[0];
    } else {
      //check the next question id in the current section and set it to question id
      const sectionQuestions = this.getSectionByIndex(
        this.currentSectionIndex
      ).questionId;
      this.currentQuestionId =
        sectionQuestions[sectionQuestions.indexOf(this.currentQuestionId) + 1];
    }
    return this.getQuestionById(this.currentQuestionId);
  }
  getPreviousQuestion(): Questions {
    const sectionQuestions = this.getSectionByIndex(
      this.currentSectionIndex
    ).questionId;
    this.currentQuestionId =
      sectionQuestions[sectionQuestions.indexOf(this.currentQuestionId) - 1];
    return this.getQuestionById(this.currentQuestionId);
  }
  isLastQuestionOfCurrentSection(id: number) {
    // compare index of current question and current sections questions array length
    const sectionQuestions = this.getSectionByIndex(
      this.currentSectionIndex
    ).questionId;
    var indexOfCurrentQuestion = sectionQuestions.indexOf(
      this.currentQuestionId
    ); //
    if (indexOfCurrentQuestion == sectionQuestions.length - 1) {
      return true;
    } else {
      return false;
    }
  }
  getAnswersOfCurrentSectionByIndex(index: number): Questions[] {
    const qids = this.getSectionByIndex(index).questionId;
    const answers = this.overAllAnswers.filter(
      (answer) => qids.indexOf(answer.qid) != -1
    );
    return answers;
  }
  incrementCurrentSection() {
    this.currentSectionIndex += 1;
  }
  skipSection() {
    this.currentSectionIndex += 1;
    this.currentQuestionId = this.getSectionByIndex(
      this.currentSectionIndex
    ).questionId[0];
  }
  goToSection(id: number) {
    this.currentSectionIndex = id;
    this.currentQuestionId = this.getSectionByIndex(
      this.currentSectionIndex
    ).questionId[0];
  }
  getAnswerByQuestionId(id: number) {
    const currentAnswers: Questions[] = this.answers.filter((x) => x.qid == id);
    return currentAnswers[0].options;
  }

  isSectionAnswered(sectionQuestions: number[]) {
    for (let i = 0; i < sectionQuestions.length; i++) {
      if (this.getAnswerByQuestionId(sectionQuestions[i]).length != 0) {
        return true;
      }
    }
    return false;
  }
}
