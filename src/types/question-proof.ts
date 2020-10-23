import { Category } from "./category";

export interface QuestionProof{

    category: Category,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type?: string
    correct?: boolean,
    dateTimeAnswer?: Date;

}