import { act } from 'react-dom/test-utils';
import { createStore } from 'redux';
import { ACTIONS, DIFFICULTIES, Proof } from '../types/proof';

const initProofs:Proof[] = []

const INITIAL_STATE = {
    proofs: initProofs,
};

function initialReducer(state = INITIAL_STATE, action){

    const proofQuestion = state.proofs?.find((proof) => proof.category.id === action.answerData?.category.id);

    switch(action.type){
        case ACTIONS.SELECT_CATEGORY: {
            const alreadyExistCategory: boolean = state.proofs.find((proof) => proof.category.id === action.category.id) != null;

            if(alreadyExistCategory){
                return {
                    ...state
                };
            }

            const proofs = state.proofs;
            proofs.push({
                category: action.category,
                questions: [],
                correctAnswers: [],
                finished: false,
                currentDifficulty: DIFFICULTIES.MEDIUM,
            })
            return {
                proofs: proofs,
            }
        } 
        case ACTIONS.ANSWER_QUESTION: {
            if(proofQuestion != null){
                proofQuestion.questions = [...proofQuestion.questions, action.answerData.question];
                proofQuestion.correctAnswers = [...proofQuestion.correctAnswers, action.answerData.question.correct];
            }
    
            return {
                ...state,
            };
        }
        case ACTIONS.CHANGE_DIFFICULTY: {
            if(proofQuestion != null){
                proofQuestion.currentDifficulty = action.answerData.currentDifficulty;
            }
    
            return {
                ...state,
            };
        }
        case ACTIONS.END_PROOF: {
            if(proofQuestion != null){
                proofQuestion.finished = true;
            }
    
    
            return {
                ...state,
            };
        }
        default: {
            return state;
        }
    }


}

const store = createStore(initialReducer);

export default store;