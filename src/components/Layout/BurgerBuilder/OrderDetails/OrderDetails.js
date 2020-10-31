import React from 'react';
import Button from '../../UI/Button/Button.js'

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function renderIngredientsList(burgerIngredientsMap){
    return (
        <ul>
            {
                Object.keys(burgerIngredientsMap)
                    .map((burgerIngredientLabel)=>
                        <li key={burgerIngredientLabel}>{capitalizeFirstLetter(burgerIngredientLabel)+`: ${burgerIngredientsMap[burgerIngredientLabel]}`}</li>
                    )
            }
        </ul>
    )
}

const orderDetails=(props)=>(
    <React.Fragment>
        <h3>Your Order:</h3>
        {renderIngredientsList(props.burgerIngredientsMap)}
        <p><strong>Total Price: ${props.totalBurgerPrice.toFixed(2)}</strong></p>
        <p>Continue To Checkout?</p>
        <Button btnClicked={props.cancelOrder} btnType="Danger">CANCEL</Button>
        <Button btnClicked={props.confirmOrder} btnType="Success">CONTINUE</Button>
    </React.Fragment>
)

export default orderDetails;