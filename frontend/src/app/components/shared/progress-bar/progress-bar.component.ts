import { Component, Input } from '@angular/core';

import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() mode: ProgressBarMode | undefined;
  @Input() value: number | undefined;
}
