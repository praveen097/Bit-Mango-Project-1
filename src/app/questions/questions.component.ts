import { Component, OnInit } from '@angular/core';
import { Sections } from '../models/sections';
import { Questions} from '../models/questions';
import { CostEstimationService } from '../cost-estimation.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questions:Questions[] = [];
  public sections:Sections[] = [];
  currentQuestion=0;
  questionIncrement(){
    this.currentQuestion++;
  }
  questionDecrement(){
    this.currentQuestion--;
  }
  constructor(private _costEstimationService: CostEstimationService) { }

  ngOnInit(): void {
    this.questions = this._costEstimationService.getQuestions();
    this.sections =  this._costEstimationService.getSections();
  }

}
