export interface Result {
  optionText: string;
  minPrice: number;
  maxPrice: number;
  minDays: number;
  maxDays: number;
  selected: boolean;
}

export interface Questions {
  qid: number;
  multiple: boolean;
  questionText: string;
  options: Result[];
}
