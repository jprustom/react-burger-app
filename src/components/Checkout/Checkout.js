import React from 'react';
import CheckoutClasses from './Checkout.module.css'
import Burger from '../BurgerBuilder/Burger/Burger.js'
import Button from '../UI/Button/Button.js'
import ContactData from './ContactData/ContactData.js'
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class Checkout extends React.Component{
    
    checkoutCanceled(){
        this.props.history.goBack()
    }
    checkoutConfirmed(){
        this.props.history.push('/checkout/contact-data')
    }
    render(){
        return this.props.burgerIngredientsMap
            ?<div className={CheckoutClasses.Checkout}>
                <h1>We hope it tastes well!!</h1>
                <Burger burgerIngredientsMap={this.props.burgerIngredientsMap}/>
                <Button btnClicked={this.checkoutCanceled.bind(this)} btnType="Danger">CANCEL</Button>
                <Button btnClicked={this.checkoutConfirmed.bind(this)} btnType="Success">CONTINUE</Button>
                <Route path={`${this.props.match.path}/contact-data`} render={()=><ContactData/>}/>
            </div>
            :<Redirect to="/" />
    }
}

function mapStateToProps({burger}){
    const {burgerIngredientsMap,totalPrice}=burger;
    return {
        burgerIngredientsMap,
        totalPrice
    }
}
export default connect(mapStateToProps)(Checkout);