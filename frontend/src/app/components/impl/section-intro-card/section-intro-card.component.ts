import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-section-intro-card',
  templateUrl: './section-intro-card.component.html',
  styleUrls: ['./section-intro-card.component.scss'],
})
export class SectionIntroCardComponent implements OnInit {
  @Output() skipSectionButtonEvent: EventEmitter<null> =
    new EventEmitter<null>();
  @Output() continueButtonEvent: EventEmitter<null> = new EventEmitter<null>();
  @Input() sectionDescription!: string;
  @Input() sectionName!: string;
  @Input() sectionTouched!: boolean;
  @Input() isLastSection!: boolean;

  continueSectionButtonText: string = 'CONTINUE';
  continueSectionButtonIcon: string = 'edit';
  skipSectionButtonText: string = '';
  skipSectionButtonIcon: string = 'skip_next';

  skipButtonProperties: any;
  continueButtonProperties: any;

  constructor() {}

  ngOnInit(): void {
    console.log(this.sectionDescription, this.sectionName);
    this.lookForChanges();
  }

  ngOnChanges() {
    this.lookForChanges();
  }

  lookForChanges() {
    if (this.sectionTouched) {
      if (this.isLastSection) {
        this.skipSectionButtonText = 'FINISH';
        this.skipSectionButtonIcon = 'navigate_next';
      } else {
        this.continueSectionButtonText = 'EDIT';
        this.skipSectionButtonText = 'NEXT SECTION';
        this.skipSectionButtonIcon = 'navigate_next';
      }
    } else {
      this.skipSectionButtonText = 'Skip ' + this.sectionName;
      this.continueSectionButtonText = 'CONTINUE';
      this.skipSectionButtonIcon = 'skip_next';
    }

    this.skipButtonProperties = {
      buttonText: this.skipSectionButtonText,
      showIcon: true,
      iconName: this.skipSectionButtonIcon,
      className: 'skipButton',
      iconClassName: 'nextIcon',
    };
    this.continueButtonProperties = {
      buttonText: this.continueSectionButtonText,
      showIcon: true,
      iconName: this.continueSectionButtonIcon,
      className: 'continueButton',
      iconClassName: 'editIcon',
    };
  }

  skipSectionButtonClick() {
    this.skipSectionButtonEvent.emit();
  }

  continueButtonClick() {
    this.continueButtonEvent.emit();
  }
}
