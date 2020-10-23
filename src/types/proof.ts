export interface Proof{

    category: Category,
    questions: QuestionProof[],
    correctAnswers: boolean[],
    finished: boolean,
    currentDifficulty: string,

}

export interface Category{

    id: number,
    name?: string,

}

export interface QuestionProof{

    category: Category,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type?: string
    correct?: boolean,

}

export interface AnswerData{

    question?: QuestionProof,
    category?: Category,
    currentDifficulty?: string,

}

export interface DefaultProps{
    proofs: Proof[],
    dispatch: Function,
}

export interface DefaultRootState{

    proofs: Proof[],

}

export const DIFFICULTIES = {
    HARD: "hard",
    MEDIUM: "medium",
    EASY: "easy"
}

export const ACTIONS = {
    SELECT_CATEGORY: 'SELECT_CATEGORY',
    ANSWER_QUESTION: 'ANSWER_QUESTION',
    CHANGE_DIFFICULTY: 'CHANGE_DIFFICULTY',
    END_PROOF: 'END_PROOF',
}