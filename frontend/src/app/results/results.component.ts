import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../services/cost-estimation.service';
// import { Questions } from '../models/questions';
// import sections from '../data/sections.json';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  option,
  question,
  sections,
  submitOptions,
  submitQuestions,
} from '../models/newSections';
// import { Sections } from '../models/sections';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 0;
  showResults: boolean = false;
  resultExist: boolean = true;
  sectionWithAnswers: sections[] = [];
  step: number = 0;
  allAnswer: question[] = [];
  showUserForm: boolean = true;
  email: string = '';
  companyName: string = '';
  form!: FormGroup;
  showProgressBar: boolean = false;

  constructor(private _costEstimationService: CostEstimationService, private formBuilder: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      companyName: [null, [Validators.required]],
    });
    // this.maxPrice = this._costEstimationService.maxPrice;
    // this.minPrice = this._costEstimationService.minPrice;

    this.allAnswer = this._costEstimationService.overAllAnswers;
    if (this.allAnswer.length == 0) {
      this.resultExist = false;
    }
    this.sectionWithAnswers = <sections[]>(
      await this._costEstimationService.getSections()
    );
    this.sectionWithAnswers.forEach((section: sections) => {
      const ansQuestions: question[] = [];
      section.questions.forEach((question: question) => {
        const ans: question[] = this.allAnswer.filter(
          (ans) => ans.id === question.id
        );
        if (ans.length != 0) {
          ansQuestions.push(ans[0]);
        }
      });
      section.questions = ansQuestions;
    });
  }
  submitAnswers() {
    this._costEstimationService.submitAnswers('test@gmail.com', 'BitMango');
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
  displayAnswers() {
    this.showProgressBar = true;
    console.log("email ",this.email, " company",this.companyName);
    this._costEstimationService
      .submitAnswers(this.email, this.companyName).then((data:any)=>{
        this.minPrice = data.lowerEstimate;
        this.maxPrice = data.upperEstimate;
        this.showUserForm = false;
      });
      // .subscribe((data: any) => {
      //   this.minPrice = data.lowerEstimate;
      //   this.maxPrice = data.upperEstimate;
      //   this.showUserForm = false;
      // });
      
  }
}
