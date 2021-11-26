import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/sections';

@Component({
  selector: 'app-section-overview-card',
  templateUrl: './section-overview-card.component.html',
  styleUrls: ['./section-overview-card.component.scss'],
})
export class SectionOverviewCardComponent {
  @Input() questions: Question[] | undefined;
  @Input() className: string | undefined;
}
