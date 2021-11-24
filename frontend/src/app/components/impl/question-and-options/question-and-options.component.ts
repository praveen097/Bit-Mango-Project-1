import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Option, Question } from 'src/app/models/sections';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-question-and-options',
  templateUrl: './question-and-options.component.html',
  styleUrls: ['./question-and-options.component.scss'],
})
export class QuestionAndOptionsComponent implements OnInit {
  @Input() answer: Option[] = [];
  @Input() presentQuestion!: Question;
  @Input() currentQuestionNumberForDisplay!: number;
  @Input() questionsLength!: number;

  @Output() getNextQuestionEvent: EventEmitter<Object> =
    new EventEmitter<Object>();
  @Output() getPreviousQuestionEvent: EventEmitter<null> =
    new EventEmitter<null>();

  progressBarMode = 'determinate';
  previousButtonProperties = {
    className: 'navButtonPrevious',
    iconName: 'navigate_before',
  };

  nextButtonProperties = {
    className: 'navButtonNext',
    iconName: 'navigate_next',
  };

  constructor() {}

  ngOnInit(): void {}

  multipleToggleSelection(option: Option): void {
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

  toggleSelection(chip: MatChip, option: Option): void {
    chip.toggleSelected();
    if (this.answer.length > 0) {
      if (this.answer[0].optionText == option.optionText) {
        this.answer[0].selected = false;
        this.answer.pop();
      } else {
        this.answer[0].selected = false;
        option.selected = true;
        this.answer[0] = option;
      }
    } else {
      option.selected = true;
      this.answer[0] = option;
    }
  }

  getNextQuestion() {
    console.log('In Question-option-comp ', this.answer);
    this.getNextQuestionEvent.emit({
      options: this.answer,
      id: this.presentQuestion.id,
    });
    this.answer = [];
  }

  getPreviousQuestion() {
    this.getPreviousQuestionEvent.emit();
  }
}
