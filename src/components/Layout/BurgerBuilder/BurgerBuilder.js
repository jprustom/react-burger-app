import React, {Component} from 'react';
import Burger from './Burger/Burger.js';
import BuildControls from '../BurgerBuilder/BuildControls/BuildControls.js';
import Modal from '../UI/Modal/Modal.js';
import OrderDetails from './OrderDetails/OrderDetails.js'

const INGREDIENTS_PRICES_MAP={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:1.7
}
class BurgerBuilder extends Component{
    state={
        burgerIngredientsMap:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:0,
        showOrderDetails:false
    }
    orderBtnClickHandler(){
        this.setState({
            showOrderDetails:true
        })
    }
    addIngredientHandler(ingredientType){
        this.setState((prevState,props)=>{
            return {
                burgerIngredientsMap:{
                    ...prevState.burgerIngredientsMap,
                    [ingredientType]:prevState.burgerIngredientsMap[ingredientType]+1
                },
                totalPrice:prevState.totalPrice+INGREDIENTS_PRICES_MAP[ingredientType]
            }
            
        })
        // console.log(this.state)
    }
    removeIngredientHandler(ingredientType){
        this.setState((prevState,props)=>{
            if (prevState.burgerIngredientsMap[`${ingredientType}`]<0)
                throw new Error('negative number of ingredient')
            if (prevState.burgerIngredientsMap[`${ingredientType}`]===0)
                return
            return {
                burgerIngredientsMap:{
                    ...prevState.burgerIngredientsMap,
                    [ingredientType]:prevState.burgerIngredientsMap[ingredientType]-1
                },
                totalPrice:prevState.totalPrice-INGREDIENTS_PRICES_MAP[ingredientType]
            }
        })
        // console.log(this.state)
    }
    getDisabledLessBtnsMap(){
        const disabledLessBtnsMap={...this.state.burgerIngredientsMap}
        for (let ingredientType in disabledLessBtnsMap)
            disabledLessBtnsMap[ingredientType]=disabledLessBtnsMap[ingredientType]===0  
        return disabledLessBtnsMap;
    }
    getIngredientsTotalAmount(){
        return Object.keys(this.state.burgerIngredientsMap)
            .map(ingredientType=>this.state.burgerIngredientsMap[ingredientType])
            .reduce((prevAmount,nextAmount)=>prevAmount+nextAmount)
    }
    cancelOrderHandler(){
        this.setState({
            showOrderDetails:false
        })
    }
    render(){
        return (
            <React.Fragment>
                <Modal modalClosed={this.cancelOrderHandler.bind(this)} showModal={this.state.showOrderDetails}>
                    <OrderDetails showOrderDetails={this.state.showOrderDetails} totalBurgerPrice={this.state.totalPrice} cancelOrder={this.cancelOrderHandler.bind(this)} confirmOrder={()=>{alert("order received")}} burgerIngredientsMap={this.state.burgerIngredientsMap}/>
                </Modal>
                <Burger burgerIngredientsMap={this.state.burgerIngredientsMap}/>
                <BuildControls
                    burgerPrice={this.state.totalPrice} 
                    addIngredient={this.addIngredientHandler.bind(this)} 
                    removeIngredient={this.removeIngredientHandler.bind(this)}
                    disabledLessBtnsMap={this.getDisabledLessBtnsMap.call(this)}   
                    disabledOrderBtn={this.getIngredientsTotalAmount.call(this)<=0}  
                    orderBtnClick={this.orderBtnClickHandler.bind(this)}                  
                />
            </React.Fragment>
        )
    }
}
export default BurgerBuilder