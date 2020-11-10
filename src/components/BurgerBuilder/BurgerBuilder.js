import React, {Component} from 'react';
import Burger from './Burger/Burger.js';
import BuildControls from '../BurgerBuilder/BuildControls/BuildControls.js';
import Modal from '../UI/Modal/Modal.js';
import OrderDetails from './OrderDetails/OrderDetails.js'
import axios from '../../axios-orders.js';
import Spinner from '../UI/Spinner/Spinner.js';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler.js"

const INGREDIENTS_PRICES_MAP={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:1.7
}
class BurgerBuilder extends Component{
    state={
        burgerIngredientsMap:null,
        totalPrice:0,
        showOrderDetails:false,
        loadingOrder:false
    }
    componentDidMount(){
        axios.get('/ingredients.json').then(response=>{
            if (response)
                this.setState({
                    burgerIngredientsMap:response.data
                })
        },error=>{
        })
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
    purchaseHandler(){

        const ingredientsQueryParams=[];
        for (let burgerIngredientDecoded in this.state.burgerIngredientsMap){
            const burgerIngredient=encodeURI(burgerIngredientDecoded);
            const burgerIngredientAmount=encodeURI(this.state.burgerIngredientsMap[burgerIngredient])
            ingredientsQueryParams.push(`${burgerIngredient}=${burgerIngredientAmount}`)
        }
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+ingredientsQueryParams.join('&')+`&totalPrice=${this.state.totalPrice}`
        })
    }
    render(){
        return (
            <React.Fragment>
                <Modal modalClosed={this.cancelOrderHandler.bind(this)} showModal={this.state.showOrderDetails}>
                    {
                        this.state.loadingOrder
                            ?<Spinner/>
                            :<OrderDetails showOrderDetails={this.state.showOrderDetails} totalBurgerPrice={this.state.totalPrice} cancelOrder={this.cancelOrderHandler.bind(this)} confirmOrder={this.purchaseHandler.bind(this)} burgerIngredientsMap={this.state.burgerIngredientsMap}/>
                    }
                    
                </Modal>
                {
                    this.state.burgerIngredientsMap
                        ?
                            <React.Fragment>
                                <Burger burgerIngredientsMap={this.state.burgerIngredientsMap}/>
                                <BuildControls
                                    burgerPrice={this.state.totalPrice} 
                                    addIngredient={this.addIngredientHandler.bind(this)} 
                                    removeIngredient={this.removeIngredientHandler.bind(this)}
                                    disabledLessBtnsMap={this.getDisabledLessBtnsMap.call(this)}   
                                    disabledOrderBtn={this.getIngredientsTotalAmount.call(this)<=0}  
                                    orderBtnClick={this.orderBtnClickHandler.bind(this)}/>
                            </React.Fragment>
                        : <Spinner/>
                }
                
            </React.Fragment>
        )
    }
}
export default withErrorHandler(BurgerBuilder,axios)