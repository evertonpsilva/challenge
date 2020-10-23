import { Category } from "./category";
import { QuestionProof } from "./question-proof";

export interface Proof{

    category: Category,
    questions: QuestionProof[],
    correctAnswers: boolean[],
    finished: boolean,
    currentDifficulty: string,

}









