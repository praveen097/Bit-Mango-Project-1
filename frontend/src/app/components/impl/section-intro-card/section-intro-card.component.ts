import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-section-intro-card',
  templateUrl: './section-intro-card.component.html',
  styleUrls: ['./section-intro-card.component.scss'],
})
export class SectionIntroCardComponent implements OnInit {
  @Input() skipIntroCardProperties: any;

  constructor() {}

  ngOnInit(): void {}
}
