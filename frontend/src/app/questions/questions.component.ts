import { Option, Question } from '../models/sections';
import { Component, OnInit } from '@angular/core';
import { CostEstimationService } from '../services/cost-estimation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatChip } from '@angular/material/chips';
import { Sections } from '../models/sections';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  presentQuestion!: Question;
  answer: Option[] = [];
  currentQuestionNumberForDisplay: number = 1;
  currentQuestionIndex: number = 0;
  sectionIndex: number = -1;
  sectionStarted: boolean = false;
  sectionTouched: boolean = false;
  continueButtonText: string = 'CONTINUE';
  newSections: Sections[] = [];

  constructor(
    private _costEstimationService: CostEstimationService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

   ngOnInit() {
    this.newSections = this._costEstimationService.sectionsData
    this.sectionIndex = this._costEstimationService.currentSectionIndex;
    this.sectionTouched = this._costEstimationService.isSectionAnswered(
      this.sectionIndex
    );
    if (this.sectionTouched) {
      this.continueButtonText = 'EDIT';
      this.presentQuestion = this._costEstimationService.getFirstQuestionofCurrentSection();
      this.answer = this._costEstimationService.getAnswerByQuestionId(
        this.presentQuestion.id
      );
    }
  }

  toOverview(): void {
    this.route.navigate([
      '/overview/' + (this._costEstimationService.currentSectionIndex - 1),
    ]);
  }

  skipSectionHandler(id: number | null) {
    this.sectionIndex = this._costEstimationService.currentSectionIndex;
    this.sectionStarted = false;
    this.sectionIndex = <number>id;
    this._costEstimationService.goToSectionByIndex(<number>id); //to be modifed
    this.currentQuestionNumberForDisplay = 1;
    this.sectionTouched = this._costEstimationService.isSectionAnswered(
      <number>id
    );
    if (this.sectionTouched) {
      this.continueButtonText = 'EDIT';
    } else {
      this.continueButtonText = 'CONTINUE';
    }

    this.presentQuestion = this._costEstimationService.getFirstQuestionofCurrentSection();
    this.answer = this._costEstimationService.getAnswerByQuestionId(
      this.presentQuestion.id
    );
  }
  skipSection() {
    if (
      this.sectionIndex <
      this._costEstimationService.sectionsData.length - 1
    ) {
      this._costEstimationService.skipSection();
    } else {
      this.route.navigate(['/results']);
    }
    this.sectionIndex = this._costEstimationService.currentSectionIndex;
  }
  continue() {
    this.sectionStarted = true;
    this.presentQuestion = this._costEstimationService.getFirstQuestionofCurrentSection();
    this.answer = this._costEstimationService.getAnswerByQuestionId(
      this.presentQuestion.id
    );
  }
  multipleToggleSelection(option: Option) {
    const isExists = this.answer.findIndex(
      (x) => x.optionText == option.optionText
    );
    if (isExists > -1) {
      this.answer[isExists].selected = false;
      this.answer != this.answer.splice(isExists, 1);
    } else {
      option.selected = true;
      this.answer.push(option);
    }
  }

  toggleSelection(chip: MatChip, option: Option) {
    chip.toggleSelected();
    if (this.answer.length > 0) {
      this.answer[0].selected = false;
    }
    option.selected = true;
    this.answer[0] = option;
  }

  previousQuestion() {
    this.currentQuestionNumberForDisplay--;
    this.presentQuestion = this._costEstimationService.getPreviousQuestion();
    this.answer = this._costEstimationService.getAnswerByQuestionId(
      this.presentQuestion.id
    );
  }

  nextQuestion(): void {
    //   //check whether option is selected

    if (this.answer.length == 0) {
      Swal.fire({
        title: 'Please select an option',
        confirmButtonColor: '#D8CE17',
        icon: 'error',
      });
    } else {
      this.currentQuestionNumberForDisplay++; // used to show question number
      //     //set current question's answer before moving to next question
      this._costEstimationService.setAnswerById(
        this.presentQuestion._id,
        this.answer
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
}
