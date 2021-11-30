import { Option, Question } from '../../models/sections';
import { Component, OnInit } from '@angular/core';
import { CostEstimationService } from '../../services/cost-estimation/cost-estimation.service';
import { Router } from '@angular/router';
import { Sections } from '../../models/sections';
import { MatDialog } from '@angular/material/dialog';
import { ValidationDialogComponent } from '../../components/shared/validation-dialog/validation-dialog.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  presentQuestion: Question | undefined;
  answer: Option[] = [];
  currentQuestionNumberForDisplay: number = 1;
  currentQuestionIndex: number = 0;
  sectionIndex: number = -1;
  sectionStarted: boolean = false;
  sectionTouched: boolean = false;
  isLastSection: boolean = false;
  sections: Sections[] = [];
  sectionDescription: string | undefined;
  sectionName: string | undefined;
  constructor(
    private _costEstimationService: CostEstimationService,
    private _route: Router,
    private _dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.sections = <Sections[]>this._costEstimationService.sectionsData;
    this.sectionIndex = this._costEstimationService.currentSectionIndex;
    this.sectionName = this.sections[this.sectionIndex].sectionName;
    this.sectionDescription =
      this.sections[this.sectionIndex].sectionDescription;
    this.sectionTouched = this._costEstimationService.isSectionAnswered(
      this.sectionIndex
    );
    if (this.sectionIndex == this.sections.length - 1) {
      this.isLastSection = true;
    }
    if (this.sectionTouched) {
      this.presentQuestion =
        this._costEstimationService.getFirstQuestionofCurrentSection();
      this.answer = this._costEstimationService.getAnswerByQuestionId(
        this.presentQuestion.id
      );
    }
  }

  skipSectionHandler(id: number | null): void {
    this.sectionIndex = this._costEstimationService.currentSectionIndex;
    this.sectionStarted = false;
    this.sectionIndex = <number>id;
    this._costEstimationService.goToSectionByIndex(<number>id);
    this.currentQuestionNumberForDisplay = 1;
    this.sectionTouched = this._costEstimationService.isSectionAnswered(
      <number>id
    );
    if (this.sectionIndex == this.sections.length - 1) {
      this.isLastSection = true;
    } else {
      this.isLastSection = false;
    }
    this.sectionName = this.sections[this.sectionIndex].sectionName;
    this.sectionDescription =
      this.sections[this.sectionIndex].sectionDescription;
    this.presentQuestion =
      this._costEstimationService.getFirstQuestionofCurrentSection();
    this.answer = this._costEstimationService.getAnswerByQuestionId(
      this.presentQuestion.id
    );
  }

  skipSection(): void {
    if (
      this.sectionIndex <
      this._costEstimationService.sectionsData.length - 1
    ) {
      this._costEstimationService.skipSection();
    } else {
      this._route.navigate(['/results']);
    }
    if (this.sectionIndex == this.sections.length - 1) {
      this.isLastSection = true;
    } else {
      this.isLastSection = false;
    }
    this.sectionIndex = this._costEstimationService.currentSectionIndex;
    this.sectionTouched = this._costEstimationService.isSectionAnswered(
      this.sectionIndex
    );
    this.sectionName = this.sections[this.sectionIndex].sectionName;
    this.sectionDescription =
      this.sections[this.sectionIndex].sectionDescription;
  }

  continue(): void {
    this.sectionStarted = true;
    this.presentQuestion =
      this._costEstimationService.getFirstQuestionofCurrentSection();
    this.answer = this._costEstimationService.getAnswerByQuestionId(
      this.presentQuestion.id
    );
  }

  previousQuestion(): void {
    this.currentQuestionNumberForDisplay--;
    this.presentQuestion = this._costEstimationService.getPreviousQuestion();
    this.answer = this._costEstimationService.getAnswerByQuestionId(
      this.presentQuestion.id
    );
  }
  openDailog(): void {
    this._dialog.open(ValidationDialogComponent);
  }

  nextQuestion(parameters: { options: Option[]; id: string }): void {
    //   //check whether option is selected
    if (parameters.options.length == 0) {
      this.openDailog();
    } else {
      this.currentQuestionNumberForDisplay++; // used to show question number
      //     //set current question's answer before moving to next question
      this._costEstimationService.setAnswerById(
        parameters.id,
        parameters.options
      );
      //     //check if current question is last question of current section
      if (
        this._costEstimationService.isLastQuestionOfCurrentSection(
          this.currentQuestionIndex
        )
      ) {
        //check if last section
        if (
          this._costEstimationService.currentSectionIndex ==
          this._costEstimationService.sectionsData.length - 1
        ) {
          //if yes, increment current section and call overview
          this._costEstimationService.incrementCurrentSection();
          this.toOverview();
        }
        //get next question and move to overpage
        else {
          this._costEstimationService.getNextQuestion();
          this.toOverview();
        }
      }
      //     //if not last question, call next question
      else {
        this.answer = [];
        this.presentQuestion = this._costEstimationService.getNextQuestion();
        this.answer = this._costEstimationService.getAnswerByQuestionId(
          this.presentQuestion.id
        );
      }
    }
  }

  toOverview(): void {
    this._route.navigate([
      '/overview/' + (this._costEstimationService.currentSectionIndex - 1),
    ]);
  }
}
