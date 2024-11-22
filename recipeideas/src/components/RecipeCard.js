import React from 'react';
import './RecipeCard.css'; // Import the CSS file

const RecipeCard = ({ recipe }) => (
  <div className="recipe-card">
    <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
    <h3 className="recipe-title">{recipe.strMeal}</h3>
  </div>
);

export default RecipeCard;
