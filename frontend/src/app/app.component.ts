import { Component } from '@angular/core';
import { CostEstimationService } from './services/cost-estimation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
 constructor(public costEstimationService: CostEstimationService){

 }
 ngOnInit(){
 this.costEstimationService.setSectionValues();
 }
}
