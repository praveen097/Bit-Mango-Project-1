import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CostEstimationService } from '../services/cost-estimation.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../models/sections';

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

  constructor(
    private _costEstimationService: CostEstimationService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('index')) {
      this.sectionRoute = this.activatedRoute.snapshot.paramMap.get('index');
      this.sectionIndex = this.sectionRoute ? parseInt(this.sectionRoute) : 0;

      this.sectionName = this._costEstimationService.getSectionNameByIndex(
        this.sectionIndex
      );

      if (
        this.sectionIndex ==
        this._costEstimationService.sectionsData.length - 1
      ) {
        this.isLastSection = true;
        this.buttonText = 'Finish';
      }

      if (
        this.sectionIndex <=
        this._costEstimationService.sectionsData.length - 1
      ) {
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
    if (!this.isLastSection) this.route.navigate(['/questions']);
    else this.route.navigate(['/results']);
  }
  toresults(): void {
    this.route.navigate(['/results']);
  }
}
