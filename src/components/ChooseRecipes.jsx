import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
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

  // useEffect(() => {
  // const allChooseRecipess = document.querySelectorAll('ChooseRecipes');
  // console.log(allChooseRecipess);
  // allChooseRecipess.forEach((card) => {
  //   card.classList.add('recipeAnimation');
  //   // const updatedCard = { ...card, disable: false };
  //   // allChooseRecipess[allChooseRecipess.indexOf(card)] = updatedCard;
  // });
  // });

  const ingredientList = ['Chicken', 'Beef', 'Pork', 'Fish', 'Pasta', 'Rice', 'Tofu', 'Carrots', 'Broccoli', 'Lettuce', 'Peppers', 'Mushrooms'];

  /*
   The handler below is commented out since useEffect automatically fetches new recipes
   when the contents of the search bar changes.
   I have kept it here in case another solution is preferred at some point.
   */
  // const handleSubmit = (e) => {e.preventDefault();getRecipes()}
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
            <div key={`recipe-key-${recipe.title}`} className={style.ChooseRecipes}>
              <p className={style.title}>{recipe.title}</p>
              <img src={recipe.image} alt={recipe.title} />
              <div>
                <p className={style.section}>Ingredients:</p>
                <Ingredients recipeID={recipe} />
                <p className={style.section}>Instructions:</p>
                <Instructions recipeID={recipe} />
              </div>
            </div>
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
