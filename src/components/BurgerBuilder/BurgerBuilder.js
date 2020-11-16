import React, {Component} from 'react';
import Burger from './Burger/Burger.js';
import BuildControls from '../BurgerBuilder/BuildControls/BuildControls.js';
import Modal from '../UI/Modal/Modal.js';
import OrderDetails from './OrderDetails/OrderDetails.js'
import axios from '../../axios-orders.js';
import Spinner from '../UI/Spinner/Spinner.js';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.js"
import {connect} from 'react-redux';


function mapStateToProps({burgerIngredientsMap,totalPrice}){
    return {
        burgerIngredientsMap,
        totalPrice
    }
}

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

        const ingredientsQueryParams=[];
        for (let burgerIngredientDecoded in this.state.burgerIngredientsMap){
            const burgerIngredient=encodeURI(burgerIngredientDecoded);
            const burgerIngredientAmount=encodeURI(this.state.burgerIngredientsMap[burgerIngredient])
            ingredientsQueryParams.push(`${burgerIngredient}=${burgerIngredientAmount}`)
        }
        this.props.history.push({
            pathname:'/checkout',
            // search:'?'+ingredientsQueryParams.join('&')+`&totalPrice=${this.state.totalPrice}`
        })
    }
    render(){
        return (
            <React.Fragment>
                <Modal modalClosed={this.cancelOrderHandler.bind(this)} showModal={this.state.showOrderDetails}>
                    {
                        this.state.loadingOrder
                            ?<Spinner/>
                            :<OrderDetails showOrderDetails={this.state.showOrderDetails} totalBurgerPrice={this.props.totalPrice} cancelOrder={this.cancelOrderHandler.bind(this)} confirmOrder={this.purchaseHandler.bind(this)} burgerIngredientsMap={this.props.burgerIngredientsMap}/>
                    }
                    
                </Modal>
                <Burger burgerIngredientsMap={this.props.burgerIngredientsMap}/>
                { <BuildControls orderBtnClick={this.orderBtnClickHandler.bind(this)}/> }
                {/* {
                    this.props.burgerIngredientsMap
                        ?
                            <React.Fragment>
                                <Burger burgerIngredientsMap={this.props.burgerIngredientsMap}/>
                                { <BuildControls orderBtnClick={this.orderBtnClickHandler.bind(this)}/> }
                            </React.Fragment>
                        : <Spinner/>
                } */}
                
            </React.Fragment>
        )
    }
}
const BurgerBuilderWrppedWithErrorHandler=withErrorHandler(BurgerBuilder,axios);
export default connect(mapStateToProps)(BurgerBuilderWrppedWithErrorHandler)