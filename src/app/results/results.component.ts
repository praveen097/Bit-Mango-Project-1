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
  answerIndex=0;
  resultantAnswers:Array<Array<Questions>>=[];
  resultText: string[] = [
    'Minimum Price $',
    'Maximum Price $',
    'Minimum Days',
    'Maximum Days',
  ];
  resultValue: number[] = [];

  constructor(
    private _costEstimationService: CostEstimationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.maxPrice = this._costEstimationService.maxPrice;
    this.minPrice = this._costEstimationService.minPrice;
    this.maxDays = this._costEstimationService.maxDays;
    this.minDays = this._costEstimationService.minDays;


    this.sections.forEach(element => {
      this.question_ids.push(element.questionId)
      this.sectionNames.push(element.sectionName)
    });
    console.log(this.sectionNames);
    this.allAnswer = this._costEstimationService.questions;
    console.log(this.allAnswer);
    this.question_ids.forEach(question_ids=>{
      const question_array:Array<Questions>=[];
      question_ids.forEach(question_id=>{
        this.allAnswer.find((question)=>{
          if(question.qid==question_id){
            question_array.push(question)
          }
        });
      })
      this.resultantAnswers.push(question_array);
    })

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
}
