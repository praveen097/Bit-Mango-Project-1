import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../../services/cost-estimation/cost-estimation.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/sections';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  sectionRoute: string | null = '';
  sectionIndex: number = 0;
  answers: Question[] = [];
  isLastSection: boolean = false;
  sectionName: string = '';
  buttonText: string = 'Next Section';
  sectionExist: boolean = true;
  overviewButtonProperties = {
    className: 'nextSectionButton',
    buttonText: 'Next Section',
    showIcon: '',
  };
  constructor(
    private _costEstimationService: CostEstimationService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.paramMap.get('index')) {
      this.sectionRoute = this._activatedRoute.snapshot.paramMap.get('index');
      this.sectionIndex = this.sectionRoute ? parseInt(this.sectionRoute) : 0;

      if (
        this.sectionIndex ==
        this._costEstimationService.sectionsData.length - 1
      ) {
        this.isLastSection = true;
        this.overviewButtonProperties.buttonText = 'Finish';
      }

      if (
        this.sectionIndex <=
        this._costEstimationService.sectionsData.length - 1
      ) {
        this.sectionName = this._costEstimationService.getSectionNameByIndex(
          this.sectionIndex
        );
        this.answers =
          this._costEstimationService.getAnswersOfCurrentSectionByIndex(
            this.sectionIndex
          );
      } else {
        this.sectionExist = false;
      }
    }
  }
  toQuestions(): void {
    if (!this.isLastSection) {
      this._route.navigate(['/questions']);
    } else {
      this._route.navigate(['/results']);
    }
  }
}
