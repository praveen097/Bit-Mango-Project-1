import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../cost-estimation.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  sectionId:number =0;
  questionId:number =0;

  constructor(private _costEstimationService:CostEstimationService,private route:Router) { }

  ngOnInit(): void {
    this.sectionId = this._costEstimationService.currentSectionId;
    this.questionId = this._costEstimationService.currentQuestionId;
  }
  toQuestions(){
    this.route.navigate(['/questions']);
  }
}
