export interface Result {
    questionText: string;
    minPrice: number;
    maxPrice: number;
    minDays: number;
    maxDays: number;
}

export interface Questions {
    qid: number;
    multiple: boolean;
    question: string;
    options: Result[];
}



