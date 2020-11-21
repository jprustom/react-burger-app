import React, {Component} from 'react';
import Burger from './Burger/Burger.js';
import BuildControls from '../BurgerBuilder/BuildControls/BuildControls.js';
import Modal from '../UI/Modal/Modal.js';
import OrderDetails from './OrderDetails/OrderDetails.js'
import axios from '../../axios-orders.js';
import Spinner from '../UI/Spinner/Spinner.js';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.js"
import {connect} from 'react-redux';
import {initBurgerFetch,showCheckout} from '../../store/actions';

class BurgerBuilder extends Component{
    state={
        showOrderDetails:false,
        loadingOrder:false
    }
    orderBtnClickHandler(){
        this.setState({
            showOrderDetails:true
        })
    }

    cancelOrderHandler(){
        this.setState({
            showOrderDetails:false
        })
    }
    purchaseHandler(){
        this.props.dispatchShowCheckout();
        this.props.history.push({
            pathname:'/checkout' })
    }
    componentDidMount(){
        this.props.dispatchInitBurger();
    }
    render(){
        console.log(this.props)
        return (
            this.props.burgerIngredientsMap
                ?   <React.Fragment>
                        <h1 style={{textAlign:'center'}}>Welcome To Jean-Paul's Burger Shop</h1>
                        <Modal modalClosed={this.cancelOrderHandler.bind(this)} showModal={this.state.showOrderDetails}>
                            {
                                this.state.loadingOrder
                                    ?<Spinner/>
                                    :<OrderDetails showOrderDetails={this.state.showOrderDetails} totalBurgerPrice={this.props.totalPrice} cancelOrder={this.cancelOrderHandler.bind(this)} confirmOrder={this.purchaseHandler.bind(this)} burgerIngredientsMap={this.props.burgerIngredientsMap}/>
                            }
                        </Modal>
                        <Burger burgerIngredientsMap={this.props.burgerIngredientsMap}/>
                        <BuildControls isAuthenticated={this.props.isAuthenticated} orderBtnClick={this.orderBtnClickHandler.bind(this)}/> 
                    </React.Fragment>
                :   <React.Fragment>
                        <Spinner/>
                        {
                            this.props.errorInitBurger
                                &&
                            <h1>Could not display Burger.</h1>}
                    </React.Fragment>
        )
    }
}
const BurgerBuilderWrappedWithErrorHandler=withErrorHandler(BurgerBuilder,axios);
function mapDispatchActionsToProps(dispatch){
    return{
        dispatchInitBurger:()=>dispatch(initBurgerFetch()),
        dispatchShowCheckout:()=>dispatch(showCheckout())
    }
}
function mapStateToProps({burger,auth}){
    const {burgerIngredientsMap,totalPrice,errorInitBurger}=burger
    return {
        burgerIngredientsMap,
        totalPrice,
        errorInitBurger,
        isAuthenticated:auth.userToken!=null
    }
}
export default connect(mapStateToProps,mapDispatchActionsToProps)(BurgerBuilderWrappedWithErrorHandler)