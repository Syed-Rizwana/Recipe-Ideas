import React, { useState, useEffect } from 'react';
import RecipeDetails from './RecipeDetails';

const RecipeList = ({ recipes }) => {
  const [message, setMessage] = useState('Enter a recipe to get started!');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  useEffect(() => {
    if (safeRecipes.length === 0 && recipes !== null) {
      setMessage('Enter a recipe to get started!');
    } else if (recipes === null) {
      setMessage('No recipes found. Try searching for another ingredient!');
    } else {
      setMessage(''); // Clear the message once recipes are found
    }
  }, [safeRecipes, recipes]);

  const handleViewDetails = (id) => {
    setSelectedRecipeId(id);
  };

  const handleCloseDetails = () => {
    setSelectedRecipeId(null);
  };

  return (
    <div>
      <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
        {message}
      </p>

      {safeRecipes.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            padding: '20px',
          }}
        >
          {safeRecipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <h3 style={{ padding: '10px', fontSize: '1.1rem' }}>{recipe.strMeal}</h3>
              <button
                style={{
                  background: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 15px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
                onClick={() => handleViewDetails(recipe.idMeal)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedRecipeId && (
        <RecipeDetails recipeId={selectedRecipeId} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default RecipeList;
