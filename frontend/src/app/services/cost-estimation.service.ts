import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  Option,
  Question,
  Sections,
  SubmitEstimates,
  SubmitQuestions,
} from '../models/sections';
@Injectable({
  providedIn: 'root',
})
export class CostEstimationService {
  maxPrice: number = 0;
  minPrice: number = 0;
  answers: Question[] = [];
  currentSectionIndex: number = 0;
  currentQuestion: string = '';
  currentQuestionIndex: number = 0;
  sectionsData: Sections[] = [];
  allQuestions: Question[] = [];

  hostUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  async setSectionValues(): Promise<void> {
    this.sectionsData = <Sections[]>await this.getSections().catch(() => {
      this.snackBar.open('Failed to connect, please try again later');
    });
    this.currentQuestion = this.getSectionByIndex(
      this.currentSectionIndex
    ).questions[this.currentQuestionIndex].id;

    for (var i = 0; i < this.sectionsData.length; i++) {
      for (var j = 0; j < this.sectionsData[i].questions.length; j++)
        this.allQuestions.push(this.sectionsData[i].questions[j]);
    }
    this.answers = this.allQuestions.map((question: Question) => {
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

  incrementCurrentSection(): void {
    this.currentSectionIndex += 1;
  }

  getSectionNameByIndex(index: number): string {
    return this.sectionsData[index].sectionName;
  }

  getSectionByIndex(index: number): Sections {
    return this.sectionsData[index];
  }

  skipSection(): void {
    this.currentSectionIndex += 1;
  }

  goToSectionByIndex(id: number): void {
    this.currentSectionIndex = id;
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.getSectionByIndex(
      this.currentSectionIndex
    ).questions[this.currentQuestionIndex].id;
  }

  getFirstQuestionofCurrentSection(): Question {
    return this.sectionsData[this.currentSectionIndex].questions[0];
  }

  setAnswerById(id: string, options: Option[]): void {
    for (var i = 0; i < this.answers.length; i++) {
      if (this.answers[i].id == id) {
        this.answers[i].options = options;
      }
    }

    let answerIndex = this.answers.findIndex((answer) => answer.id == id);
    if (answerIndex == -1) {
      let questionTemplate = this.getQuestionById(id);
      const question = JSON.parse(JSON.stringify(questionTemplate));
      question.options = options;
      this.answers.push(JSON.parse(JSON.stringify(question)));
    } else {
      this.answers[answerIndex].options = options;
    }
  }

  isLastQuestionOfCurrentSection(id: number): boolean {
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

  getNextQuestion(): Question {
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

  getQuestionById(id: string): Question {
    let currentQuestion = <Question>this.allQuestions.find(
      (question: Question) => {
        return question.id == id;
      }
    );
    return currentQuestion;
  }

  getPreviousQuestion(): Question {
    const sectionQuestions = this.getSectionByIndex(
      this.currentSectionIndex
    ).questions;
    this.currentQuestion = sectionQuestions[this.currentQuestionIndex - 1].id;
    this.currentQuestionIndex--;
    return this.getQuestionById(this.currentQuestion);
  }

  getAnswerByQuestionId(id: string): Option[] {
    const currentAnswers: Question[] = this.answers.filter((x) => x.id == id);
    return currentAnswers[0].options;
  }

  isSectionAnswered(sectionIndex: number): boolean {
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

  isResultExists(): boolean {
    for (var i = 0; i < this.sectionsData.length; i++) {
      if (this.isSectionAnswered(i)) {
        return true;
      }
    }
    return false;
  }

  getAnswersOfCurrentSectionByIndex(index: number): Question[] {
    const section = this.getSectionByIndex(index);
    const qids = section.questions.map((question) => {
      return question.id;
    });
    const answers = this.answers.filter(
      (answer) => qids.indexOf(answer.id) != -1
    );
    return answers;
  }

  submitAnswers(email: string, companyName: string): Promise<SubmitEstimates> {
    let finalAnswers: SubmitQuestions[] = [];
    this.answers.forEach((answer) => {
      if (answer.options.length != 0) {
        finalAnswers.push({
          multiple: answer.multiple,
          questionText: answer.questionText,
          options: answer.options.map((option) => ({
            optionText: option.optionText,
            minPrice: option.minPrice,
            maxPrice: option.maxPrice,
          })),
        });
      }
    });

    const data = {
      email: email,
      answeredQuestions: finalAnswers,
      companyName: companyName,
    };
    return this.http
      .post<SubmitEstimates>(this.hostUrl + '/submissions', data)
      .toPromise();
  }
}
