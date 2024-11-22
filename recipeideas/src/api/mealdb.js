import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

export const fetchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(`${API_URL}${ingredient}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
