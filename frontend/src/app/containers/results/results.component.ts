import { Component, OnInit } from '@angular/core';
import { CostEstimationService } from '../../services/cost-estimation/cost-estimation.service';
import {
  Question,
  Sections,
  SubmitEstimates,
  UserDetails,
} from '../../models/sections';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

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
  answers: Question[] = [];
  showUserForm: boolean = true;

  constructor(
    private _costEstimationService: CostEstimationService,
    private _snackBarService:SnackbarService
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
  }

  displayAnswers(formValues: UserDetails): void {
    this._costEstimationService
      .submitAnswers(formValues.email, formValues.companyName)
      .then((data: SubmitEstimates) => {
        this.minPrice = data.lowerEstimate;
        this.maxPrice = data.upperEstimate;
        this.showUserForm = false;
        this._snackBarService.showSnackBar('Email Successfully sent to '+formValues.email)
      });
  }
}
