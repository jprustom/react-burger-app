import React,{Component} from 'react';
import Button from '../../UI/Button/Button.js'

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}



class OrderDetails extends Component{
   
    shouldComponentUpdate(nextProps){
        return (nextProps.showOrderDetails!==this.props.showOrderDetails)
    }
    renderIngredientsList(){
        return (
            <ul>
                {
                    Object.keys(this.props.burgerIngredientsMap)
                        .map((burgerIngredientLabel)=>
                            <li key={burgerIngredientLabel}>{capitalizeFirstLetter(burgerIngredientLabel)+`: ${this.props.burgerIngredientsMap[burgerIngredientLabel]}`}</li>
                        )
                }
            </ul>
        )
    }
    render(){
        return (
            <React.Fragment>
                <h3>Your Order:</h3>
                {this.renderIngredientsList()}
                <p><strong>Total Price: ${this.props.totalBurgerPrice.toFixed(2)}</strong></p>
                <p>Continue To Checkout?</p>
                <Button btnClicked={this.props.cancelOrder} btnType="Danger">CANCEL</Button>
                <Button btnClicked={this.props.confirmOrder} btnType="Success">CONTINUE</Button>
            </React.Fragment>
        )
    }
}

export default OrderDetails;