import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ButtonProperties } from 'src/app/models/sections';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss'],
})
export class NavigationButtonsComponent implements OnInit {
  @Input() buttonProperties!: ButtonProperties;

  @Output() navButtonEvent: EventEmitter<null> = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  navigationButtonClick():void {
    this.navButtonEvent.emit();
  }
}
