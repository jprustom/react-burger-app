import React, {Component} from 'react';
import Burger from './Burger/Burger.js';
import BuildControls from '../BurgerBuilder/BuildControls/BuildControls.js';
import Modal from '../UI/Modal/Modal.js';
import OrderDetails from './OrderDetails/OrderDetails.js'
import axios from '../../axios-orders.js';
import Spinner from '../UI/Spinner/Spinner.js';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.js"
import {connect} from 'react-redux';
import {initBurgerFetch} from '../../store/actions/burgerActions.js';
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
        this.props.history.push({
            pathname:'/checkout' })
    }
    componentDidMount(){
        this.props.dispatchInitBurger();
    }
    render(){
        return (
            this.props.burgerIngredientsMap
                ?   <React.Fragment>
                        <Modal modalClosed={this.cancelOrderHandler.bind(this)} showModal={this.state.showOrderDetails}>
                            {
                                this.state.loadingOrder
                                    ?<Spinner/>
                                    :<OrderDetails showOrderDetails={this.state.showOrderDetails} totalBurgerPrice={this.props.totalPrice} cancelOrder={this.cancelOrderHandler.bind(this)} confirmOrder={this.purchaseHandler.bind(this)} burgerIngredientsMap={this.props.burgerIngredientsMap}/>
                            }
                        </Modal>
                        <Burger burgerIngredientsMap={this.props.burgerIngredientsMap}/>
                        <BuildControls orderBtnClick={this.orderBtnClickHandler.bind(this)}/> 
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
        dispatchInitBurger:()=>dispatch(initBurgerFetch())
    }
}
function mapStateToProps({burgerIngredientsMap,totalPrice,errorInitBurger}){
    return {
        burgerIngredientsMap,
        totalPrice,
        errorInitBurger
    }
}
export default connect(mapStateToProps,mapDispatchActionsToProps)(BurgerBuilderWrappedWithErrorHandler)