import React from 'react';
import PropTypes from 'prop-types';
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import style from '../style/RecipeCard.module.css';

function RecipeCard({ recipe }) {
  const { image, id: recipeID, title } = recipe;

  return (
    <div  className={style.RecipeCard}>
      <p>{title}</p>
      <img src={image} alt={title} />
      <div>
        <p className={style.section}>Ingredients:</p>
        <Ingredients recipeID={recipeID} />
        <Instructions recipeID={recipeID} />
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