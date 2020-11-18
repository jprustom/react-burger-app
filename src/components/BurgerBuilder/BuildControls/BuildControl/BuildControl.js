import React from 'react';
import BuildControlClasses from './BuildControl.module.css';
import * as ingredientsActions from '../../../../store/actions/burgerActions.js';
import {connect} from 'react-redux';

const buildControl=(props)=>(
    <div className={BuildControlClasses.BuildControl}>
        <div className={BuildControlClasses.Label}>{props.ingredient}</div>
        <button disabled={props.ingredientNotChosen} onClick={props.dispatchRemoveIngredient.bind(null,props.ingredient)} className={BuildControlClasses.Less}>Less</button>
        <button onClick={props.dispatchAddIngredient.bind(null,props.ingredient)} className={BuildControlClasses.More}>More</button>
    </div>
);
function mapDispatchActionsToProps(dispatch){
    return {
        dispatchAddIngredient:(ingredientToAdd)=>dispatch(ingredientsActions.addIngredient(ingredientToAdd)),
        dispatchRemoveIngredient:(ingredientToRemove)=>dispatch(ingredientsActions.removeIngredient(ingredientToRemove))
    }
}
export default connect(null,mapDispatchActionsToProps)(buildControl);