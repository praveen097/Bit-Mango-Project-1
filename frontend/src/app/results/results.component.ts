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
  answers: Question[] = [];
  showUserForm: boolean = true;
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
    this.answers = this._costEstimationService.answers;
    this.resultExist = this._costEstimationService.isResultExists();
    this.sectionsWithAnswersSaved = <Sections[]>(
      await this._costEstimationService.getSections()
    );
    this.sectionsWithAnswersSaved.forEach((section: Sections) => {
      const answeredQuestions: Question[] = [];
      section.questions.forEach((question: Question) => {
        const currentQuestionsWithAnswer: Question[] = this.answers.filter(
          (currentQuestionsWithAnswer) =>
            currentQuestionsWithAnswer.id === question.id
        );
        if (currentQuestionsWithAnswer[0].options.length) {
          answeredQuestions.push(currentQuestionsWithAnswer[0]);
        }
      });

      section.questions = answeredQuestions;
    });
  }

  toResults(): void {
    this.showResults = true;
  }

  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }
  displayAnswers(): void {
    this.showProgressBar = true;
    this._costEstimationService
      .submitAnswers(
        this.form.controls.email.value,
        this.form.controls.companyName.value
      )
      .then((data: any) => {
        this.minPrice = data.lowerEstimate;
        this.maxPrice = data.upperEstimate;
        this.showUserForm = false;
      });
  }
}
