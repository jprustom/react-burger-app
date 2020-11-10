import React from 'react';
import CheckoutClasses from './Checkout.module.css'
import Burger from '../BurgerBuilder/Burger/Burger.js'
import Button from '../UI/Button/Button.js'
import ContactData from './ContactData/ContactData.js'
import {Route} from 'react-router-dom';

class Checkout extends React.Component{
    state={
        burgerIngredientsMap:null
    }
    componentWillMount(){
        const queryParameters=new URLSearchParams(this.props.location.search)
        for (const [ingredient,ingredientAmount] of queryParameters.entries()){
            if (ingredient==='totalPrice')
                continue;
            this.setState(previousState=>{
                return {
                    burgerIngredientsMap:{
                        ...previousState.burgerIngredientsMap,
                        [ingredient]:+ingredientAmount
                    }
                }
            })
        } 
        console.log(this.state)
    }
    checkoutCanceled(){
        this.props.history.goBack()
    }
    checkoutConfirmed(){
        this.props.history.push('/checkout/contact-data')
    }
    render(){
        return <div className={CheckoutClasses.Checkout}>
            <h1>We hope it tastes well!!</h1>
            <Burger burgerIngredientsMap={this.state.burgerIngredientsMap}/>
            <Button btnClicked={this.checkoutCanceled.bind(this)} btnType="Danger">CANCEL</Button>
            <Button btnClicked={this.checkoutConfirmed.bind(this)} btnType="Success">CONTINUE</Button>
            <Route path={`${this.props.match.path}/contact-data`} render={()=><ContactData burgerIngredientsMap={this.state.burgerIngredientsMap}/>}/>
        </div>
    }
}

export default Checkout;