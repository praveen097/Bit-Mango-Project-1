import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/sections';

@Component({
  selector: 'app-answered-questions-view',
  templateUrl: './answered-questions-view.component.html',
  styleUrls: ['./answered-questions-view.component.scss'],
})
export class AnsweredQuestionsViewComponent implements OnInit {
  @Input() questionWithAnswers!: Question;
  @Input() className!: string;

  constructor() {}

  ngOnInit(): void {}
}
