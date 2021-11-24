import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answered-questions-view',
  templateUrl: './answered-questions-view.component.html',
  styleUrls: ['./answered-questions-view.component.scss'],
})
export class AnsweredQuestionsViewComponent implements OnInit {
  @Input() questionWithAnswers: any;
  @Input() className: any;

  constructor() {}

  ngOnInit(): void {}
}
