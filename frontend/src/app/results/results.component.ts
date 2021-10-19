import { Component, OnInit } from '@angular/core';
import { CostEstimationService } from '../services/cost-estimation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question, Sections } from '../models/sections';

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
  sectionsWithAnswersSaved: Sections[] = [];
  step: number = 0;
  overAllAnswers: Question[] = [];
  showUserForm: boolean = true;
  email: string = '';
  companyName: string = '';
  form!: FormGroup;
  showProgressBar: boolean = false;

  constructor(
    private _costEstimationService: CostEstimationService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      companyName: [null, [Validators.required]],
    });
    this.overAllAnswers = this._costEstimationService.overAllAnswers;
    if (this.overAllAnswers.length == 0) {
      this.resultExist = false;
    }
    this.sectionsWithAnswersSaved = <Sections[]>(
      await this._costEstimationService.getSections()
    );
    this.sectionsWithAnswersSaved.forEach((section: Sections) => {
      const answeredQuestions: Question[] = [];
      section.questions.forEach((question: Question) => {
        const currentQuestionsWithAnswer: Question[] = this.overAllAnswers.filter(
          (currentQuestionsWithAnswer) => currentQuestionsWithAnswer.id === question.id
        );
        if (currentQuestionsWithAnswer.length != 0) {
          answeredQuestions.push(currentQuestionsWithAnswer[0]);
        }
      });
      section.questions = answeredQuestions;
    });
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
  displayAnswers() {
    this.showProgressBar = true;
    this._costEstimationService
      .submitAnswers(this.email, this.companyName)
      .then((data: any) => {
        this.minPrice = data.lowerEstimate;
        this.maxPrice = data.upperEstimate;
        this.showUserForm = false;
      });
  }
}
