import React, {Component} from 'react';
import Burger from './Burger/Burger.js'
import BuildControls from '../BurgerBuilder/BuildControls/BuildControls.js'

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
        totalPrice:0
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

    render(){
        const disabledLessBtnsMap={...this.state.burgerIngredientsMap}
        for (let ingredientType in disabledLessBtnsMap)
            disabledLessBtnsMap[ingredientType]=disabledLessBtnsMap[ingredientType]===0     
        return (
            <React.Fragment>
                <Burger burgerIngredientsMap={this.state.burgerIngredientsMap}/>
                <BuildControls 
                    addIngredient={this.addIngredientHandler.bind(this)} 
                    removeIngredient={this.removeIngredientHandler.bind(this)}
                    disabledLessBtnsMap={disabledLessBtnsMap}                       
                />
            </React.Fragment>
        )
    }
}
export default BurgerBuilder