import React, { useState } from 'react';
import ChooseRecipes from './components/ChooseRecipes';
import style from './style/App.module.css';

function App() {
  const [num, setNum] = useState(4);
  const numberList = [1, 4, 12, 16, 36];
  return (
    <div className={style.App}>
      <header>
        <h1>Recipe Avalanche</h1>
      </header>
      <h2>Pick an ingredient, and we&apos;ll find recipes!</h2>

      {/*
      The buttons below allow the user to select the numeber of recipes to fetch
      for each search.  This number is passed to the Ingredients component as
      props.num
      */}

      <p className={style.select}>
        Select number of recipe suggestions:&nbsp;
        {num}
      </p>
      <div className={style.buttonDiv}>

        {numberList.map((number) => (
          <button key={`number-button-${number}`} type="button" className={style.numButton} onClick={() => setNum(number)}>
            {number}
          </button>
        ))}

      </div>
      <ChooseRecipes num={num} />
    </div>
  );
}

export default App;
