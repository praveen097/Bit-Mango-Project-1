import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonProperties } from 'src/app/models/sections';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  @Output() buttonClicked: EventEmitter<null> = new EventEmitter<null>();
  @Input() buttonProperties: ButtonProperties | undefined;

  clickButton(): void {
    this.buttonClicked.emit();
  }
}
