import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {
  question,
  sections,
  submitOptions,
  submitQuestions,
} from '../models/newSections';
@Injectable({
  providedIn: 'root',
})
export class CostEstimationService {
  maxPrice: number = 0;
  minPrice: number = 0;
  overAllAnswers: question[] = [];
  currentSectionIndex: number = 0;
  currentQuestion: string = '';
  currentQuestionIndex: number = 0;
  sectionsData: sections[] = [];
  answers: question[] = [];
  allSections: sections[] = [];
  allQuestions: question[] = [];

  hostUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  async setSectionValues() {
    this.sectionsData = <sections[]>await this.getSections();
    this.currentQuestion = this.getSectionByIndex(
      this.currentSectionIndex
    ).questions[this.currentQuestionIndex].id;

    for (var i = 0; i < this.sectionsData.length; i++) {
      for (var j = 0; j < this.sectionsData[i].questions.length; j++)
        this.allQuestions.push(this.sectionsData[i].questions[j]);
    }
    this.answers = this.allQuestions.map((question: question) => {
      return {
        _id: question._id,
        multiple: question.multiple,
        questionText: question.questionText,
        options: [],
        id: question.id,
        __v: question.__v,
      };
    });
  }

  getSections() {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostUrl + '/sections').subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  incrementCurrentSection() {
    this.currentSectionIndex += 1;
  }

  getSectionNameByIndex(index: number) {
    return this.sectionsData[index].sectionName;
  }
  getSectionByIndex(index: number) {
    return this.sectionsData[index];
  }
  skipSection() {
    this.currentSectionIndex += 1;
  }
  goToSectionByIndex(id: number) {
    this.currentSectionIndex = id;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.sectionsData[this.currentSectionIndex].questions[0];
  }

  setAnswerById(id: string, options: any) {
    for (var i = 0; i < this.answers.length; i++) {
      if (this.answers[i].id == id) {
        this.answers[i].options = options;
        for (var j = 0; j < this.answers[i].options.length; j++) {
          this.maxPrice += this.answers[i].options[j].maxPrice;
          this.minPrice += this.answers[i].options[j].minPrice;
        }
      }
    }

    let answerIndex = this.overAllAnswers.findIndex(
      (answer) => answer.id == id
    );
    if (answerIndex == -1) {
      let questionTemplate = this.getQuestionById(id);
      const question = JSON.parse(JSON.stringify(questionTemplate));
      question.options = options;
      this.overAllAnswers.push(JSON.parse(JSON.stringify(question)));

    } else {
      this.overAllAnswers[answerIndex].options = options;
    }
  }
  isLastQuestionOfCurrentSection(id: number) {
    // compare index of current question and current sections questions array length
    const sectionQuestions = this.getSectionByIndex(
      this.currentSectionIndex
    ).questions;
    if (this.currentQuestionIndex == sectionQuestions.length - 1) {
      return true;
    } else {
      return false;
    }
  }

  getNextQuestion(): question {
    //   //check if this is the last question of current section
    if (this.isLastQuestionOfCurrentSection(this.currentQuestionIndex)) {
      //increment current section as we need next section
      this.currentSectionIndex += 1;
      this.currentQuestionIndex = 0;
      //set current question id to first index of next section
      this.currentQuestion = this.getSectionByIndex(
        this.currentSectionIndex
      ).questions[this.currentQuestionIndex].id;
    } else {
      //     //check the next question id in the current section and set it to question id
      this.currentQuestionIndex++;
      const sectionQuestions = this.getSectionByIndex(
        this.currentSectionIndex
      ).questions;
      this.currentQuestion = sectionQuestions[this.currentQuestionIndex].id;
    }
    return this.getQuestionById(this.currentQuestion);
  }

  getQuestionById(id: string): question {
    let currentQuestion = <question>this.allQuestions.find(
      (question: question) => {
        return question.id == id;
      }
    );
    return currentQuestion;
  }

  getPreviousQuestion(): question {
    const sectionQuestions = this.getSectionByIndex(
      this.currentSectionIndex
    ).questions;
    this.currentQuestion = sectionQuestions[this.currentQuestionIndex - 1].id;
    this.currentQuestionIndex--;
    return this.getQuestionById(this.currentQuestion);
  }

  getAnswerByQuestionId(id: string) {
    const currentAnswers: question[] = this.answers.filter((x) => x.id == id);
    return currentAnswers[0].options;
  }

  isSectionAnswered(sectionIndex: number) {
    for (let i = 0; i < this.sectionsData[sectionIndex].questions.length; i++) {
      if (
        this.getAnswerByQuestionId(
          this.sectionsData[sectionIndex].questions[i].id
        ).length != 0
      ) {
        return true;
      }
    }
    return false;
  }

  getAnswersOfCurrentSectionByIndex(index: number) {
    const section = this.getSectionByIndex(index);
    const qids = section.questions.map((question) => {
      return question.id;
    });
    const answers = this.overAllAnswers.filter(
      (answer) => qids.indexOf(answer.id) != -1
    );
    return answers;
  }
  submitAnswers(email: string, companyName: string) {
    let finalAnswers: submitQuestions[] = [];
    finalAnswers = this.overAllAnswers.map((answer) => ({
      multiple: answer.multiple,
      questionText: answer.questionText,
      options: answer.options.map((option) => ({
        optionText: option.optionText,
        minPrice: option.minPrice,
        maxPrice: option.maxPrice,
      })),
    }));

    const data = {
      email: email,
      answeredQuestions: finalAnswers,
      companyName: companyName,
    };
    return this.http.post(this.hostUrl + '/submissions', data).toPromise();
    // .then((data) => {
    //   console.log(data);
    // });
  }
}
