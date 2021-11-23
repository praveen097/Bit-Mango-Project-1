import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  @Output() buttonClicked: EventEmitter<null> = new EventEmitter<null>();
  @Input() buttonProperties: any;
  constructor() {}

  ngOnInit(): void {}

  clickButton() {
    this.buttonClicked.emit();
  }
}
