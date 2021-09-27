import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../services/cost-estimation.service';
import { Questions } from '../models/questions';
import sections from '../data/sections.json';
import { Sections } from '../models/sections';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 0;
  minDays: number = 0;
  maxDays: number = 0;
  //hello changes
  allAnswer: Questions[] = [];
  showResults: boolean = false;
  resultExist: boolean = true;
  sections:Array<Sections> = sections;
  sectionNames:Array<string>=[];
  question_ids:Array<Array<number>>=[];
  resultantAnswers:Array<Array<Questions>>=[];
  sectionWithAnswers:any;
  resultText: string[] = [
    'Minimum Price $',
    'Maximum Price $',
    'Minimum Days',
    'Maximum Days',
  ];
  resultValue: number[] = [];
  step = 0;

  constructor(
    private _costEstimationService: CostEstimationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.maxPrice = this._costEstimationService.maxPrice;
    this.minPrice = this._costEstimationService.minPrice;
    this.maxDays = this._costEstimationService.maxDays;
    this.minDays = this._costEstimationService.minDays;

    this.allAnswer = this._costEstimationService.overAllAnswers;
    console.log(this.allAnswer);
    this.sectionWithAnswers = sections;
    this.sectionWithAnswers.forEach((element:any) => {
      const ans_list:Array<Questions>=[];
      element.questionId.forEach((q_id:number) => {
        const new_ans = this.allAnswer.filter((ans)=>ans.qid === q_id);
        if(new_ans.length!=0){
          ans_list.push(new_ans[0])
        }
      });
      element.answers = ans_list;
    });
    console.log(this.sectionWithAnswers)

    if (this.allAnswer.length == 0) {
      this.resultExist = false;
    }
    this.resultValue = [
      this.minPrice,
      this.maxPrice,
      this.minDays,
      this.maxDays,
    ];
  }

  toResults(): void {
    this.showResults = true;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
