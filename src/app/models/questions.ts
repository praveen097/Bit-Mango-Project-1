export interface Result {
    option: string;
    minPrice: number;
    maxPrice: number;
    minDays: number;
    maxDays: number;
}

export interface Questions {
    id: number;
    multiple: boolean;
    question: string;
    result: Result[];
}



