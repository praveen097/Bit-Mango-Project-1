import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/sections';

@Component({
  selector: 'app-section-overview-card',
  templateUrl: './section-overview-card.component.html',
  styleUrls: ['./section-overview-card.component.scss'],
})
export class SectionOverviewCardComponent implements OnInit {
  @Input() questions!: Question[];
  @Input() className!: string;

  constructor() {}

  ngOnInit(): void {}
}
