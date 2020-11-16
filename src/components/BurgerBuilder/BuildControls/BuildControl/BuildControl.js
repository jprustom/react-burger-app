import React from 'react';
import BuildControlClasses from './BuildControl.module.css';
import actions from '../../../../store/actions/ingredientsActions.js';
import {connect} from 'react-redux';

function mapDispatchActionsToProps(dispatch){
    return {
        dispatchAddIngredient:(ingredientToAdd)=>dispatch({type:actions.ADD_INGREDIENT,ingredientToAdd}),
        dispatchRemoveIngredient:(ingredientToRemove)=>dispatch({type:actions.REMOVE_INGREDIENT,ingredientToRemove})
    }
}
const buildControl=(props)=>(
    <div className={BuildControlClasses.BuildControl}>
        <div className={BuildControlClasses.Label}>{props.ingredient}</div>
        <button disabled={props.ingredientNotChosen} onClick={props.dispatchRemoveIngredient.bind(null,props.ingredient)} className={BuildControlClasses.Less}>Less</button>
        <button onClick={props.dispatchAddIngredient.bind(null,props.ingredient)} className={BuildControlClasses.More}>More</button>
    </div>
);

export default connect(null,mapDispatchActionsToProps)(buildControl);