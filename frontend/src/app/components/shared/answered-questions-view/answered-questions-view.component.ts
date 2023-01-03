import { Component, Input } from '@angular/core';
import { Question } from 'src/app/models/sections';

@Component({
  selector: 'app-answered-questions-view',
  templateUrl: './answered-questions-view.component.html',
  styleUrls: ['./answered-questions-view.component.scss'],
})
export class AnsweredQuestionsViewComponent {
  @Input() questionWithAnswers: Question | undefined;
  @Input() className: string | undefined;
}
