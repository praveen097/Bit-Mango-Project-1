export interface Option {
    _id: string;
    optionText: string;
    minPrice: number;
    maxPrice: number;
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

export interface ISections {
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