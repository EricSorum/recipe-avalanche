import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import style from '../style/RecipeCard.module.css';



function RecipeCard({ recipe }) {
  const { image, id: recipeID, title } = recipe;

  const cardRef = useRef(null);

  const expandCard = (e) => {
    // first need to close all other cards.
    // useRef for recipesGrid, then search all cards and change aria-expanded to false.

    const thisEl = e.target.closest("#expandableCard") || e.target;
    const thisAria = thisEl.getAttribute("aria-expanded")
    thisEl.setAttribute("aria-expanded",
      thisAria === "true" ? "false" : "true"
    )
  }

  useEffect(() => {
    function handleClickOutside(event) {
      // here i need to check if I'm clicking in a card that is not aria-expanded=true
      const cardEl = event.target.closest("#expandableCard");
      if (!cardEl) {
        cardRef.current.setAttribute("aria-expanded", "false")
        
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <button type="button" ref={cardRef} id="expandableCard" className={style.RecipeCard} aria-expanded="false" onClick={expandCard}>
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