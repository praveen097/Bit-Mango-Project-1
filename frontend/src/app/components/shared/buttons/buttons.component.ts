import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ButtonProperties } from 'src/app/models/sections';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  @Output() buttonClicked: EventEmitter<null> = new EventEmitter<null>();
  @Input() buttonProperties!: ButtonProperties;
  constructor() {}

  ngOnInit(): void {
    console.log('Buttons Called');
  }

  clickButton() {
    this.buttonClicked.emit();
  }
}
