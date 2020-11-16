import actions from '../../actions/ingredientsActions';

const INGREDIENTS_PRICES_MAP={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:1.7
}
const ingredientsInitialState={
    burgerIngredientsMap:{
        bacon:0,
        cheese:0,
        meat:0,
        salad:0
    },
    totalPrice:0
}
function ingredientsReducer(ingredientsOldState=ingredientsInitialState,ingredientsAction){
    switch(ingredientsAction.type){
        case (actions.ADD_INGREDIENT):
            return {
                burgerIngredientsMap:{
                    ...ingredientsOldState.burgerIngredientsMap,
                    [ingredientsAction.ingredientToAdd]:ingredientsOldState.burgerIngredientsMap[ingredientsAction.ingredientToAdd]+1
                },
                totalPrice:ingredientsOldState.totalPrice+INGREDIENTS_PRICES_MAP[ingredientsAction.ingredientToAdd]
            }
        case (actions.REMOVE_INGREDIENT):
            return {
                burgerIngredientsMap:{
                    ...ingredientsOldState.burgerIngredientsMap,
                    [ingredientsAction.ingredientToRemove]:ingredientsOldState.burgerIngredientsMap[ingredientsAction.ingredientToRemove]-1
                },
                totalPrice:ingredientsOldState.totalPrice-INGREDIENTS_PRICES_MAP[ingredientsAction.ingredientToRemove]
            }
        case (actions.RESET_INGREDIENTS):
            return ingredientsInitialState
        default:
            return ingredientsOldState;
    }
}
export default ingredientsReducer;