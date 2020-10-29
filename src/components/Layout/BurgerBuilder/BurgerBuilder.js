import React, {Component} from 'react';
import Burger from './Burger/Burger.js'
import BuildControls from '../BurgerBuilder/BuildControls/BuildControls.js'

class BurgerBuilder extends Component{
    state={
        burgerIngredientsMap:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        }
    }
    
    render(){
        return (
            <React.Fragment>
                <Burger burgerIngredientsMap={this.state.burgerIngredientsMap}/>
                <BuildControls/>
            </React.Fragment>
        )
    }
}
export default BurgerBuilder