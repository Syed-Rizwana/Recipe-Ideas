import React, { useState, useEffect } from 'react';

const RecipeDetails = ({ recipeId, onClose }) => {
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const data = await response.json();
        if (data.meals && data.meals[0]) {
          setRecipeDetails(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipeDetails) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.modal}>
      <button onClick={onClose} style={styles.closeBtn}>
        Close
      </button>
      <div style={styles.container}>
        {/* Recipe Title */}
        <h2 style={styles.title}>{recipeDetails.strMeal || 'Recipe Details'}</h2>

        {/* Image and Ingredients */}
        <div style={styles.topSection}>
          {/* Recipe Image */}
          <img
            src={recipeDetails.strMealThumb}
            alt={recipeDetails.strMeal || 'Recipe'}
            style={styles.image}
          />

          {/* Ingredients */}
          <div style={styles.ingredientsSection}>
            <h3 style={styles.subheading}>Ingredients:</h3>
            <ul style={styles.ingredientsList}>
              {Array.from({ length: 20 }, (_, i) => {
                const ingredient = recipeDetails[`strIngredient${i + 1}`];
                const measure = recipeDetails[`strMeasure${i + 1}`];
                if (ingredient) {
                  return (
                    <li key={i} style={styles.listItem}>
                      {measure} {ingredient}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>

        {/* Cooking Instructions */}
        <div style={styles.instructionsSection}>
          <h3 style={styles.subheading}>Cooking Instructions:</h3>
          <p style={styles.instructions}>{recipeDetails.strInstructions}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      zIndex: '1000',
      overflowY: 'auto', // Ensure modal content is scrollable if needed
    },
    closeBtn: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      background: '#ff4d4d',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      fontWeight: 'bold',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    container: {
      maxWidth: '1000px',
      width: '100%',
      backgroundColor: '#E8E8E8',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column', // Stack content vertically
      alignItems: 'center',
      overflowY: 'auto', // Enable scrolling if content overflows
      maxHeight: '80vh', // Limit max height to 80% of the viewport height
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
      padding: '10px 0',
      width: '100%',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      overflow: 'visible',
      lineHeight: '1.2',
      textOverflow: 'ellipsis',
      flexShrink: 0,
    },
    topSection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    image: {
      flex: '0 0 45%',
      maxWidth: '400px',
      height: 'auto',
      borderRadius: '8px',
      marginRight: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    ingredientsSection: {
      flex: '1',
      overflowY: 'auto',
    },
    subheading: {
      fontSize: '22px',
      marginBottom: '10px',
      color: '#555',
    },
    ingredientsList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      fontSize: '16px',
      color: '#333',
    },
    listItem: {
      marginBottom: '5px',
    },
    instructionsSection: {
      marginTop: '20px',
    },
    instructions: {
      lineHeight: '1.6',
      fontSize: '16px',
      textAlign: 'justify',
      color: '#333',
    },
    loading: {
      fontSize: '18px',
      textAlign: 'center',
      color: '#333',
    },
  };
  

export default RecipeDetails;
