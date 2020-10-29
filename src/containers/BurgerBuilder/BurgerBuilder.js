import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger.js'
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
                <p>Burger Controls</p>
            </React.Fragment>
        )
    }
}
export default BurgerBuilder