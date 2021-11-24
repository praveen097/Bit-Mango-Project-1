import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss'],
})
export class NavigationButtonsComponent implements OnInit {

  @Input() buttonProperties: any;

  @Output() navButtonEvent: EventEmitter<null> = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {}

  navigationButtonClick() {
    this.navButtonEvent.emit();
  }
}
