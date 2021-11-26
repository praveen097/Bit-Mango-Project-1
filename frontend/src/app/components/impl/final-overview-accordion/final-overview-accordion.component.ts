import { Component, OnInit, Input, Output } from '@angular/core';
import { ButtonProperties, Sections } from 'src/app/models/sections';

@Component({
  selector: 'app-final-overview-accordion',
  templateUrl: './final-overview-accordion.component.html',
  styleUrls: ['./final-overview-accordion.component.scss'],
})
export class FinalOverviewAccordionComponent implements OnInit {
  @Input() questionsList: Sections[]| undefined;

  @Output() className: string = 'resultAnswerContainer';
  step: number = 0;
  @Output() previousSectionButtonProperties: ButtonProperties = {
    buttonText: 'Previous Section',
    className: 'prevButton',
    disabled: false,
    showIcon: false,
    iconClassName: '',
    iconName: '',
  };

  @Output() nextSectionButtonProperties: ButtonProperties = {
    buttonText: 'Next Section',
    className: 'nextButton',
    disabled: false,
    showIcon: false,
    iconClassName: '',
    iconName: '',
  };

  constructor() {}

  ngOnInit(): void {}
  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }
}
