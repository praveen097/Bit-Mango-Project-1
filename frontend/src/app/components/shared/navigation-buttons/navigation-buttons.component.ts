import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ButtonProperties } from 'src/app/models/sections';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss'],
})
export class NavigationButtonsComponent {
  @Input() buttonProperties: ButtonProperties | undefined;

  @Output() navButtonEvent: EventEmitter<null> = new EventEmitter<null>();

  navigationButtonClick(): void {
    this.navButtonEvent.emit();
  }
}
