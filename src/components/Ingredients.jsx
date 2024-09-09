import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from '../style/Ingredients.module.css';

/*
This component fetches the ingredient list of each recipe from spoonacular.com
The documentation for this API function may be found here:
https://spoonacular.com/food-api/docs#Ingredients-by-ID
Each recipe is searched by ID, and saved into the "data" variable as a JSON file.
The first key in the JSON is "ingredients," which is saved to "recipe" using useState.
From there, the name and US amount value (quantity) and unit of measurement
is rendered for each ingredient.
*/

function Ingredients(props) {
  const [recipe, setRecipe] = useState([]);
  const { recipeID } = props;
  const getRecipe = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/${recipeID.id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`,
    );
    const data = await api.json();
    setRecipe(data.ingredients);
  };
  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <ul className={style.ingredients}>
      {recipe.map((ingredient) => (
        <li key={ingredient.id} className={style.bullet}>
          <p>
            {ingredient.amount.us.value}
            {' '}
            {ingredient.amount.us.unit}
            {' '}
            {ingredient.name}
          </p>
        </li>
      ))}
    </ul>
  );
}
Ingredients.defaultProps = {
  recipeID: 'chicken',
};
Ingredients.propTypes = {
  recipeID: PropTypes.string,
};
export default Ingredients;
