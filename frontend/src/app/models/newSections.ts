export interface option {
  _id: string;
  optionText: string;
  minPrice: number;
  maxPrice: number;
  selected: boolean;
  __v: number;
  id: string;
}

export interface question {
  _id: string;
  questionText: string;
  multiple: boolean;
  options: option[];
  __v: number;
  id: string;
}


export interface sections {
  _id: string;
  sectionName: string;
  sectionDescription: string;
  published_at: Date;
  questions: question[];
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

