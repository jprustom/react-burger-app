import React from 'react';
import BurgerStyles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient.js'
import PropTypes from 'prop-types'


function renderBurgerIngredients(burgerIngredientsMap,lastBurgerIngredientRef){
    const burgerIngredients=Object.keys(burgerIngredientsMap);
    const burgerIngredientsToDisplay=burgerIngredients
        .map((burgerIngredient)=>{
                //Each burgerIngredient will be mapped to an array containing one or more instances of itself
                const burgerIngredientFrequency=burgerIngredientsMap[burgerIngredient];
                let burgerIngredientArray=[] //this array will hold the same type of ingredient for eg ['bacon','bacon']
                for (let burgerIngredientInstance=1;burgerIngredientInstance<=burgerIngredientFrequency;burgerIngredientInstance++)
                    burgerIngredientArray.push(<BurgerIngredient lastBurgerIngredientRef={lastBurgerIngredientRef} key={burgerIngredient + burgerIngredientInstance} ingredientType={burgerIngredient}/>)
            return burgerIngredientArray})
        .reduce((prevIngredientArray,curIngredientArray)=>{
            return prevIngredientArray.concat(curIngredientArray)
        })
    return burgerIngredientsToDisplay;
}
class Burger extends React.Component{
    constructor(props){
        super(props);
        this.lastBurgerIngredientRef=React.createRef()
    }
    render(){
        if (this.lastBurgerIngredientRef.current)
            this.lastBurgerIngredientRef.current.scrollIntoView();
        return <div className={BurgerStyles.Burger}>
            <BurgerIngredient ingredientType="breadTop"/>
            {
                renderBurgerIngredients(this.props.burgerIngredientsMap)
                    .length===0
                        ?<p>Please start adding ingredients</p>
                        :renderBurgerIngredients(this.props.burgerIngredientsMap,this.lastBurgerIngredientRef)
                }
            <BurgerIngredient ingredientType="breadBottom"/>
        </div>
    }
    }

Burger.propTypes={
    burgerIngredientsMap:PropTypes.exact({
        meat:PropTypes.number,
        bacon:PropTypes.number,
        cheese:PropTypes.number,
        salad:PropTypes.number
    }).isRequired
}
export default Burger;