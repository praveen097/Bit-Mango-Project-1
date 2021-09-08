import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../cost-estimation.service';
import { ActivatedRoute } from '@angular/router';
import { Questions } from '../models/questions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  sectionRoute:string  | null ="";
  sectionId:number = 0;
  answers:Questions[] = [];

  constructor(private _costEstimationService:CostEstimationService,
    private route:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('index')){
    this.sectionRoute = this.activatedRoute.snapshot.paramMap.get('index');
    this.sectionId = this.sectionRoute?parseInt(this.sectionRoute):0;
    this.answers=this._costEstimationService.getAnswersOfSectionByIndex(this.sectionId);
    console.log(this.answers);
    }
  }
  toQuestions(){
    this.route.navigate(['/questions']);
  }
}
