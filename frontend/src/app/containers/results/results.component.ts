import { Component, OnInit } from '@angular/core';
import { CostEstimationService } from '../../services/cost-estimation/cost-estimation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question, Sections, SubmitEstimates } from '../../models/sections';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
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
    console.log(this.sectionsWithAnswersSaved);
  }

  displayAnswers(formValues: any): void {
    this.showProgressBar = true;
    this._costEstimationService
      .submitAnswers(formValues.email, formValues.companyName)
      .then((data: SubmitEstimates) => {
        this.minPrice = data.lowerEstimate;
        this.maxPrice = data.upperEstimate;
        this.showUserForm = false;
        this._snackBar.open(
          'Email successfully sent to ' + formValues.email,
          'OK',
          {
            duration: 5000,
          }
        );
      });
  }
}
