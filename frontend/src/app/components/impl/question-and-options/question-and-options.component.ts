import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ButtonProperties, Option, Question } from 'src/app/models/sections';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-question-and-options',
  templateUrl: './question-and-options.component.html',
  styleUrls: ['./question-and-options.component.scss'],
})
export class QuestionAndOptionsComponent implements OnInit {
  @Input() answer: Option[] = [];
  @Input() presentQuestion: Question | undefined;
  @Input() currentQuestionNumberForDisplay: number | undefined;
  @Input() questionsLength: number | undefined;

  @Output() getNextQuestionEvent: EventEmitter<{
    options: Option[];
    id: string;
  }> = new EventEmitter<{ options: Option[]; id: string }>();
  @Output() getPreviousQuestionEvent: EventEmitter<null> =
    new EventEmitter<null>();

  @Output() progressBarMode: ProgressBarMode = 'determinate';
  @Output() previousButtonProperties: ButtonProperties = {
    className: 'navButtonPrevious',
    iconName: 'navigate_before',
    buttonText: '',
    disabled: false,
    showIcon: true,
    iconClassName: 'nav-icons',
  };

  @Output() nextButtonProperties: ButtonProperties = {
    className: 'navButtonNext',
    iconName: 'navigate_next',
    buttonText: '',
    disabled: false,
    showIcon: true,
    iconClassName: 'nav-icons',
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

  getNextQuestion(): void {
    if (this.presentQuestion) {
      this.getNextQuestionEvent.emit({
        options: this.answer,
        id: this.presentQuestion.id,
      });
      this.answer = [];
    }
  }

  getPreviousQuestion(): void {
    this.getPreviousQuestionEvent.emit();
  }
}
