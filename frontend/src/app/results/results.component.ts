import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../services/cost-estimation.service';
import { Questions } from '../models/questions';
import { ISections } from '../models/newSections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  //hello changes
  maxPrice: number = 0;
  minPrice: number = 0;
  allAnswer: Questions[] = [];
  showResults: boolean = false;
  resultExist: boolean = true;
  sectionWithAnswers: ISections[] = [];
  step: number = 0;
  showUserForm: boolean = true;
  email: string = '';
  companyName: string = '';
  form!: FormGroup;

  constructor(
    private _costEstimationService: CostEstimationService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      companyName: [null, [Validators.required]],
    });
    this.allAnswer = this._costEstimationService.overAllAnswers;
    if (this.allAnswer.length == 0) {
      this.resultExist = false;
    }
    this.sectionWithAnswers = this._costEstimationService.newSections;
    this.sectionWithAnswers.forEach((section: any) => {
      const ans_list: any = [];
      section.questions.forEach((question: any) => {
        const ans = this.allAnswer.filter(
          (ans) => ans.questionText === question.questionText
        );
        if (ans.length != 0) {
          ans_list.push(ans[0].options);
        }
        question.options = ans_list[0];
      });
    });
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
    this._costEstimationService
      .postAnswers(this.email, this.companyName)
      .subscribe((data: any) => {
        this.minPrice = data.lowerEstimate;
        this.maxPrice = data.upperEstimate;
      });
    this.showUserForm = false;
  }
}
