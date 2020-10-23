import axios from 'axios';
import { Category } from '../types/category';
import { QuestionProof } from '../types/question-proof';

const QuestionService = {

    getQuestions: async (category: Category, difficulty: string): Promise<QuestionProof[]> => {
        const result: QuestionProof[] = (await axios.get('https://opentdb.com/api.php?amount=10&category=' + category.id +'&difficulty=' + difficulty + '&type=multiple')).data.results;
        return result;
    }

};

export default QuestionService;