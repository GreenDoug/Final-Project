const recipeForm = document.getElementById("recipe-form");
const recipeResults = document.getElementById("recipe-results");

// Fetch recipes from Spoonacular API
const fetchRecipes = async (ingredients) => {
  const apiKey = "b49032e0f49f47139afcc1e81d2f6989"; // Replace with your Spoonacular API key
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

  try {
    // Display loading message
    recipeResults.innerHTML = "<p>Loading recipes...</p>";

    // Fetch data from the API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const recipes = await response.json();

    // Check if recipes are returned
    if (recipes.length === 0) {
      recipeResults.innerHTML = "<p>No recipes found. Try different ingredients.</p>";
      return;
    }

    // Render recipe results
    recipeResults.innerHTML = recipes
      .map(
        (recipe) => `
        <div class="recipe">
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}">
          <p><strong>Used Ingredients:</strong> ${recipe.usedIngredientCount}</p>
          <p><strong>Missing Ingredients:</strong> ${recipe.missedIngredientCount}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    // Display error message
    recipeResults.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
    console.error("Error fetching recipes:", error);
  }
};

// Handle form submission
recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get ingredients from the form input
  const ingredients = document.getElementById("ingredients").value.trim();
  if (!ingredients) {
    recipeResults.innerHTML = "<p>Please enter at least one ingredient.</p>";
    return;
  }

  // Fetch and display recipes
  fetchRecipes(ingredients);
});
