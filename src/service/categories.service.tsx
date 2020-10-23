import axios from 'axios';
import { Category } from '../types/proof';

const CategoriesService = {
    getCategories: async (): Promise<Category[]> => {
        const result: Category[] = (await axios.get('https://opentdb.com/api_category.php')).data.trivia_categories;
        return result;
    }
}

export default CategoriesService;