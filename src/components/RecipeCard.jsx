import React from 'react';
import PropTypes from 'prop-types';
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import style from '../style/RecipeCard.module.css';

function RecipeCard({ recipe }) {
  const { image, id: recipeID, title } = recipe;


  const expandCard = (e) => {
    const thisEl = e.target;
    const thisAria = thisEl.getAttribute("aria-expanded")
    thisEl.setAttribute("aria-expanded",
      thisAria === "true" ? "false" : "true"
    )
  }

  return (
    <button type="button" className={style.RecipeCard} aria-expanded="false" onClick={expandCard}>
      <p>{title}</p>
      <img src={image} alt={title} />
      <div className={style.ingredients}>
        <p className={style.section}>Ingredients:</p>
        <Ingredients recipeID={recipeID} />
        <Instructions recipeID={recipeID} />
      </div>
    </button>
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