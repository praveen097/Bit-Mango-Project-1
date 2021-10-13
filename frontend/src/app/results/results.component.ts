import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../services/cost-estimation.service';
// import { Questions } from '../models/questions';
// import sections from '../data/sections.json';
import {
  option,
  question,
  sections,
  submitOptions,
  submitQuestions,
} from '../models/newSections';
// import { Sections } from '../models/sections';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 0;
  showResults: boolean = false;
  resultExist: boolean = true;
  sectionWithAnswers: sections[] = [];
  step: number = 0;
  allAnswer: question[] = [];

  constructor(private _costEstimationService: CostEstimationService) {}

  async ngOnInit(): Promise<void> {
    this.maxPrice = this._costEstimationService.maxPrice;
    this.minPrice = this._costEstimationService.minPrice;

    this.allAnswer = this._costEstimationService.overAllAnswers;
    if (this.allAnswer.length == 0) {
      this.resultExist = false;
    }
    this.sectionWithAnswers = <sections[]>(
      await this._costEstimationService.getSections()
    );
    this.sectionWithAnswers.forEach((section: sections) => {
      section.questions.forEach((question: question) => {
        const ans: question[] = this.allAnswer.filter(
          (ans) => ans.id === question.id
        );
        if (ans.length != 0) {
          question.options = ans[0].options;
        } else {
          question.options = [];
        }
      });
    });
  }
  submitAnswers() {
    this._costEstimationService.submitAnswers('test@gmail.com', 'BitMango');
  }

  toResults(): void {
    this.showResults = true;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
