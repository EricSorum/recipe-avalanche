import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';
import style from '../style/ChooseRecipes.module.css';

function ChooseRecipes(props) {
  // recipes is the data for each recipe fetched from the API
  const [recipes, setRecipes] = useState([]);
  // ingredients corresponds to the the word(s) the user searches for.
  const [ingredient, setIngredient] = useState('broccoli');
  const { num } = props;
  /*
   The Ingredients component contains most of the app functionality.  The useEffect hook
   controls the getIngredients function, which fetches data from the spoonacular API.
   This component finds the title and image of each recipe from spoonacular.
   The documentation for this API function may be found here:
   https://spoonacular.com/food-api/docs#Search-Recipes-by-Nutrients
   By passing [ingredient] as the second parameter of useEffect, a new search will
   start when new ingredients are entered.
  */

  const getRecipes = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.REACT_APP_API_KEY}&ingredients=${ingredient}&number=${num}`,
    );
    const data = await api.json();
    setRecipes(data);
  };

  useEffect(() => {
    getRecipes();
  }, [ingredient]);

  const ingredientList = ['Chicken', 'Beef', 'Pork', 'Fish', 'Pasta', 'Rice', 'Tofu', 'Carrots', 'Broccoli', 'Lettuce', 'Peppers', 'Mushrooms'];

  return (
    <div className={style.mainColumn}>
      <p className={style.select}>
        Search recipes by clicking an ingredient:
        <span> </span>
        {ingredient}
      </p>
      {/**
         The buttons below serve as easy, one-click searches for a particular ingredient.
          */}
      <div className={style.buttonsGrid}>
        {ingredientList.map((ingredientName) => (
          <button
            key={`ingredient-key-${ingredientName.replaceAll(' ', '')}`}
            type="button"
            onClick={() => {
              setIngredient(ingredientName);
            }}
          >
            {ingredientName}
          </button>
        ))}

      </div>

      {/*
         The form below serves as a search bar where the user can search for recipes
         using any ingredient.
          */}
      <p className={style.select}>-Or-</p>
      <form>
        <label htmlFor="custom">Search any ingredient: </label>
        <input name="custom" id="custom" onChange={(e) => setIngredient(e.target.value)} />
      </form>

      <div className={style.recipesGrid}>
        {recipes.length > 0 && (
          recipes.map((recipe) => (
            <RecipeCard key={`recipe-key-${recipe.title.replaceAll(" ", "")}`} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
}
// Set to 1 for testing.
ChooseRecipes.defaultProps = {
  num: 1,
};
ChooseRecipes.propTypes = {
  num: PropTypes.number,
};
export default ChooseRecipes;
