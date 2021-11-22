export interface Option {
  _id: string;
  optionText: string;
  minPrice: number;
  maxPrice: number;
  selected: boolean;
  __v: number;
  id: string;
}

export interface Question {
  _id: string;
  questionText: string;
  multiple: boolean;
  options: Option[];
  __v: number;
  id: string;
}


export interface Sections {
  _id: string;
  sectionName: string;
  sectionDescription: string;
  published_at: Date;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface SubmitOptions {
  optionText: string;
  minPrice: number;
  maxPrice: number;
}

export interface SubmitQuestions {
  questionText: string;
  multiple: boolean;
  options: SubmitOptions[];
}

export interface SubmitEstimates {
  lowerEstimate:number;
  upperEstimate:number;
}