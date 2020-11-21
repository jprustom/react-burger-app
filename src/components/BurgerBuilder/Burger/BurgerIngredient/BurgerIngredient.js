import React from 'react';
import BurgerIngredientsStyles from './BurgerIngredient.module.css'
import PropTypes from 'prop-types';

function getIngredient(ingredientType,lastBurgerIngredientRef){
    switch(ingredientType){
        case('breadBottom'):
            return <div className={BurgerIngredientsStyles.BreadBottom}></div> 
        case('breadTop'):
            return (
                <div className={BurgerIngredientsStyles.BreadTop}>
                    <div className={BurgerIngredientsStyles.Seeds1}></div>
                    <div className={BurgerIngredientsStyles.Seeds2}></div>
                </div>
            )
        case('meat'):
            return <div ref={lastBurgerIngredientRef} className={BurgerIngredientsStyles.Meat}></div> 
        case('cheese'):
            return <div ref={lastBurgerIngredientRef} className={BurgerIngredientsStyles.Cheese}></div> 
        case('salad'):
            return <div  ref={lastBurgerIngredientRef} className={BurgerIngredientsStyles.Salad}></div> 
        case('bacon'):
            return <div ref={lastBurgerIngredientRef} className={BurgerIngredientsStyles.Bacon}></div> 
        default: //should never get here because we used PropTypes validation
            throw new Error(`unknown type ${ingredientType}`)
    }
}
const burgerIngredient=props=>getIngredient(props.ingredientType,props.lastBurgerIngredientRef)

burgerIngredient.propTypes={
    ingredientType:PropTypes.oneOf(['breadBottom','breadTop','meat','cheese','salad','bacon']).isRequired
}

export default burgerIngredient;