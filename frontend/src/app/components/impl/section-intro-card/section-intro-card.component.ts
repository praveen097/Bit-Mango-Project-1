import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { ButtonProperties } from 'src/app/models/sections';

@Component({
  selector: 'app-section-intro-card',
  templateUrl: './section-intro-card.component.html',
  styleUrls: ['./section-intro-card.component.scss'],
})
export class SectionIntroCardComponent implements OnInit, OnChanges {
  @Output() skipSectionButtonEvent: EventEmitter<null> =
    new EventEmitter<null>();
  @Output() continueButtonEvent: EventEmitter<null> = new EventEmitter<null>();
  @Input() sectionDescription: string | undefined;
  @Input() sectionName: string | undefined;
  @Input() sectionTouched: boolean | undefined;
  @Input() isLastSection: boolean | undefined;

  continueSectionButtonText: string = 'CONTINUE';
  continueSectionButtonIcon: string = 'edit';
  skipSectionButtonText: string = '';
  skipSectionButtonIcon: string = 'skip_next';

  skipButtonProperties: ButtonProperties | undefined;
  continueButtonProperties: ButtonProperties | undefined;

  ngOnInit(): void {
    this.lookForChanges();
  }

  ngOnChanges(): void {
    this.lookForChanges();
  }

  lookForChanges(): void {
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
      disabled: false,
    };
    this.continueButtonProperties = {
      buttonText: this.continueSectionButtonText,
      showIcon: true,
      iconName: this.continueSectionButtonIcon,
      className: 'continueButton',
      iconClassName: 'editIcon',
      disabled: false,
    };
  }

  skipSectionButtonClick(): void {
    this.skipSectionButtonEvent.emit();
  }

  continueButtonClick(): void {
    this.continueButtonEvent.emit();
  }
}
