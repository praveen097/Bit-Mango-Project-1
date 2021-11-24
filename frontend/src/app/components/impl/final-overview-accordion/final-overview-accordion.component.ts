import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-final-overview-accordion',
  templateUrl: './final-overview-accordion.component.html',
  styleUrls: ['./final-overview-accordion.component.scss'],
})
export class FinalOverviewAccordionComponent implements OnInit {
  @Input() questionsList: any;

  className = 'resultAnswerContainer';
  step = 0;
  previousSectionButtonProperties = {
    buttonText: 'Previous Section',
    className: 'prevButton',
    disabled: false,
    showIcon: false,
  };

  nextSectionButtonProperties = {
    buttonText: 'Next Section',
    className: 'nextButton',
    disabled: false,
    showIcon: false,
  };

  constructor() {}

  ngOnInit(): void {}
  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
    // if (this.step > 0) {
    //   this.previousSectionButtonProperties.disabled = false;
    // } else {
    //   this.previousSectionButtonProperties.disabled = true;
    // }

    // if (this.step == this.questionsList.length - 1) {
    //   this.nextSectionButtonProperties.disabled = true;
    // }
  }

  prevStep(): void {
    this.step--;
    // if (this.step == 0) {
    //   this.previousSectionButtonProperties.disabled = true;
    // } else {
    //   this.previousSectionButtonProperties.disabled = false;
    // }
    // this.nextSectionButtonProperties.disabled = false;
  }
}
