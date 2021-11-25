import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Sections } from 'src/app/models/sections';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Output() tabClicked: EventEmitter<number | null> = new EventEmitter<
    number | null
  >();
  @Input() selectedIndex: number | undefined;
  @Input() newSections: Sections[] | undefined;

  constructor() {}

  ngOnInit(): void {
  }

  tabSelectChange(tabNumber: number | null):void {
    this.tabClicked.emit(tabNumber);
  }
}
