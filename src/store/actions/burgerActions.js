import * as actionTypes from './actionsTypes.js';
import axios from '../../axios-orders.js';

export const addIngredient=function(ingredientToAdd){
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientToAdd
    }
}
export const removeIngredient=function(ingredientToRemove){
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientToRemove
    }
}
const initBurger=({ingredientsToInit,ingredientsInitTotalPrice})=>{
    return {
        type:actionTypes.INIT_BURGER,
        ingredientsToInit,
        ingredientsInitTotalPrice
    }
}
const initBurgerFetchError=function(error){
    console.log('CATCHED ERROR',error)
    return {
        type:actionTypes.INIT_BURGER_ERROR,
        // error
    }
}
export const initBurgerFetch=()=>{
    return dispatch=>{
        axios.get('/burgerBuilderInit.json')
            .then((response)=>{
                dispatch(initBurger(response.data))

                })
            .catch((err)=>{
                dispatch(initBurgerFetchError(err));
            })
    }
}