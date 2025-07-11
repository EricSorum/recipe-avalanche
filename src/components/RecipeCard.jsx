import React from 'react';
import PropTypes from 'prop-types';
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import style from '../style/RecipeCard.module.css';

function RecipeCard({ recipe }) {
  const { image, id: recipeID, title } = recipe;
  // console.log(recipeID)
  // const [ingredients, setIngredients] = useState([]);
  // const [instructions, setInstructions] = useState([]);



  // const getIngredients = async () => {
  //   const api = await fetch(
  //     `https://api.spoonacular.com/recipes/${recipeID}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`,
  //   );
  //   const data = await api.json();
  //   setIngredients(data.ingredients);
  // };
  // useEffect(() => {
  //   getIngredients();
  // }, []);


  // const getInstructions = async () => {
  //   const api = await fetch(
  //     `https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions?apiKey=${process.env.REACT_APP_API_KEY}`,
  //   );
  //   const data = await api.json();
  //   setInstructions(data[0].steps);
  // };
  // useEffect(() => {
  //   getInstructions();
  // }, []);


  return (
    <div  className={style.RecipeCard}>

      <p>{title}</p>
      <img src={image} alt={title} />
      <div>
        <p className={style.section}>Ingredients:</p>
        <Ingredients recipeID={recipeID} />
            {/* <ul className={style.ingredients}>
      {ingredients.map((ingredient) => (
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
        <p className={style.section}>Instructions:</p> */}


        <Instructions recipeID={recipeID} />
           {/* <ul>
      {instructions.map((instruction) => (
        <li key={instruction.number} className={style.bullet}>
          <p>
            {instruction.number}
            .
            {instruction.step}
          </p>
        </li>
      ))}
    </ul> */}


      </div>
    </div>
  )
}
RecipeCard.defaultProps = {
  recipe: {
    image: '',
    id: '',
    title: ''
  }
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
  })
};
export default RecipeCard;