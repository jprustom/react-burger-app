import React from 'react';
import OrderClasses from './Order.module.css';


const order=(props)=> {
    const orderIngredients=[];
    for (let orderIngredientName in props.orderBurgerIngredientsMap){
        orderIngredients.push({
            orderIngredientName,
            orderIngredientAmount:props.orderBurgerIngredientsMap[orderIngredientName]
        })
    }
    return (
        <div className={OrderClasses.Order}>
            <p>Ingredients:</p>
            {
                orderIngredients
                    .map(
                        (orderIngredient)=>
                            <span key={orderIngredient.orderIngredientName}>
                                {orderIngredient.orderIngredientName} ({orderIngredient.orderIngredientAmount})
                            </span>
                        )
            }
            <p>Price: <strong>{props.orderTotalPrice.toFixed(2)+'$'}</strong></p>
        </div>
    )
    }

export default order;