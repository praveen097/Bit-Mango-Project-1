import { Component, OnInit } from '@angular/core';
import { CostEstimationService } from '../services/cost-estimation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Question, Sections } from '../models/sections';

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
  sectionWithAnswers: Sections[] = [];
  step: number = 0;
  allAnswer: Question[] = [];
  showUserForm: boolean = true;
  email: string = '';
  companyName: string = '';
  form!: FormGroup;
  showProgressBar: boolean = false;

  constructor(
    private _costEstimationService: CostEstimationService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      companyName: [null, [Validators.required]],
    });
    this.allAnswer = this._costEstimationService.overAllAnswers;
    if (this.allAnswer.length == 0) {
      this.resultExist = false;
    }
    this.sectionWithAnswers = <Sections[]>(
      await this._costEstimationService.getSections()
    );
    this.sectionWithAnswers.forEach((section: Sections) => {
      const ansQuestions: Question[] = [];
      section.questions.forEach((question: Question) => {
        const ans: Question[] = this.allAnswer.filter(
          (ans) => ans.id === question.id
        );
        if (ans.length != 0) {
          ansQuestions.push(ans[0]);
        }
      });
      section.questions = ansQuestions;
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
    this.showProgressBar = true;
    console.log('email ', this.email, ' company', this.companyName);
    this._costEstimationService
      .submitAnswers(this.email, this.companyName)
      .then((data: any) => {
        this.minPrice = data.lowerEstimate;
        this.maxPrice = data.upperEstimate;
        this.showUserForm = false;
      });
  }
}
