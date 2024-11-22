import React, { useState } from 'react';
import { fetchRecipesByIngredient } from '../api/mealdb';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const handleSearch = async (ingredient) => {
      setLoading(true);
      const results = await fetchRecipesByIngredient(ingredient);
      setRecipes(results);
      setLoading(false);
    };
  
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Welcome, Taylor!</h1>
        <SearchBar onSearch={handleSearch} />
        {loading ? <p>Loading recipes...</p> : <RecipeList recipes={recipes} />}
      </div>
    );
  };
  

export default Home;
