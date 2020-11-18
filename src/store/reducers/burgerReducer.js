import * as actionsTypes from '../actions/actionsTypes.js';
const INGREDIENTS_PRICES_MAP={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:1.7
}
function addBurgerIngredient(burgerOldState,ingredientToAdd){
    return {
        ...burgerOldState,
        burgerIngredientsMap:{
            ...burgerOldState.burgerIngredientsMap,
            [ingredientToAdd]:burgerOldState.burgerIngredientsMap[ingredientToAdd]+1
        },
        totalPrice:burgerOldState.totalPrice+INGREDIENTS_PRICES_MAP[ingredientToAdd]
    }
}
function removeBurgerIngredient(burgerOldState,ingredientToAdd){
    return {
        ...burgerOldState,
        burgerIngredientsMap:{
            ...burgerOldState.burgerIngredientsMap,
            [ingredientToAdd]:burgerOldState.burgerIngredientsMap[ingredientToAdd]-1
        },
        totalPrice:burgerOldState.totalPrice-INGREDIENTS_PRICES_MAP[ingredientToAdd]
    }
}
const burgerInitialState={
    burgerIngredientsMap:null,
    totalPrice:null,
    errorInitBurger:false
}
function initializeBurger(ingredientsToInit,ingredientsInitTotalPrice){
    return {
        burgerIngredientsMap:ingredientsToInit,
        totalPrice:ingredientsInitTotalPrice,
        errorInitBurger:false
    }
}
function enableErrorInitBurger(burgerOldState){
    return {
        ...burgerOldState,
        errorInitBurger:true
    }
}
function ingredientsReducer(burgerOldState=burgerInitialState,burgerAction){
    switch(burgerAction.type){
        case (actionsTypes.ADD_INGREDIENT):
            return addBurgerIngredient(burgerOldState,burgerAction.ingredientToAdd);
        case (actionsTypes.REMOVE_INGREDIENT):
            return removeBurgerIngredient(burgerOldState,burgerAction.ingredientToRemove);
        case (actionsTypes.INIT_BURGER):
            return initializeBurger(burgerAction.ingredientsToInit,burgerAction.ingredientsInitTotalPrice);
        case (actionsTypes.INIT_BURGER_ERROR): //WHAT TO DO?
            return enableErrorInitBurger(burgerOldState);
        case '@@INIT':
            return burgerOldState;
        default:
            throw new Error(`Unknown action type! Provided type was ${burgerAction.type}`)
    }
}
export default ingredientsReducer;