import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section-overview-card',
  templateUrl: './section-overview-card.component.html',
  styleUrls: ['./section-overview-card.component.scss'],
})
export class SectionOverviewCardComponent implements OnInit {
  @Input() questions: any;
  @Input() className: any;

  constructor() {}

  ngOnInit(): void {}
}
