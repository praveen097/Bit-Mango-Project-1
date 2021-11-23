import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Output() tabClicked: EventEmitter<number | null> = new EventEmitter<
    number | null
  >();
  @Input() tabProperties: any;

  constructor() {}

  ngOnInit(): void {
    console.log('Buttons Called');
  }

  tabSelectChange(tabNumber: number | null) {
    this.tabClicked.emit(tabNumber);
  }
}
