import { Injectable } from '@angular/core';
import questions from './questions.json';
import sections from './sections.json';

@Injectable({
  providedIn: 'root'
})
export class CostEstimationService {
  
  constructor() { }
  getQuestions(){
    return questions;
  }
  getSections(){
    return sections;
  }

}
