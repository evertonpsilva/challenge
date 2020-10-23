import { AnswerData, Category } from "../../types/proof";

const Actions = {

    selectCategory(category: Category){

        return {
            type: 'SELECT_CATEGORY',
            category,
        };
    
    },

    answerQuestion(answerData: AnswerData){
        return {
            type: 'ANSWER_QUESTION',
            answerData,
        }
    },

    endProof(answerData: AnswerData){
        return {
            type: 'END_PROOF',
            answerData
        }
    },
    
    changeDificulty(answerData: AnswerData){
        return {
            type: 'CHANGE_DIFFICULTY',
            answerData,
        }
    }
    
};

export default Actions;