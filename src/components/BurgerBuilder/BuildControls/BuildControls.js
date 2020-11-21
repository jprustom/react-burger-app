import React from 'react';
import BuildControlsClasses from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl.js'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

function renderBuildControls(burgerIngredientsMap,burgerIngredientsArray){
    return burgerIngredientsArray.map(burgerIngredient=>(
        <BuildControl 
            ingredient={burgerIngredient}
            ingredientNotChosen={burgerIngredientsMap[burgerIngredient]===0} 
            key={burgerIngredient}
        />
    ))
}
const buildControls=(props)=>{
    const burgerIngredientsArray=Object.keys(props.burgerIngredientsMap);
    const isBurgerEmpty=burgerIngredientsArray
                            .map(ingredient=>props.burgerIngredientsMap[ingredient])
                            .reduce((prevAmount,nextAmount)=>prevAmount+nextAmount)
                                ===0
    return (
        <div className={BuildControlsClasses.BuildControls}>
            <p>Burger Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {renderBuildControls(props.burgerIngredientsMap,burgerIngredientsArray)}
            {
                props.isAuthenticated
                    ?<button onClick={props.orderBtnClick} disabled={isBurgerEmpty} className={BuildControlsClasses.OrderButton}>ORDER NOW</button>
                    :<button disabled={isBurgerEmpty} onClick={()=>{props.history.push('/auth/signin?isOrderPending=true')}} className={BuildControlsClasses.OrderButton}>Sign In To Order</button>
            }
        </div>
    )
};
function mapStateToProps({burger}){
    const {burgerIngredientsMap,totalPrice}=burger;
    return {
        burgerIngredientsMap,
        totalPrice
    }
}
const buildControlsWithRouter=withRouter(buildControls)
export default connect(mapStateToProps)(buildControlsWithRouter);