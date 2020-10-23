import { Category } from "./category";
import { QuestionProof } from "./question-proof";

export interface AnswerData{

    question?: QuestionProof,
    category?: Category,
    currentDifficulty?: string,

}