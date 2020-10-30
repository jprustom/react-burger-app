import React from 'react';
import BuildControlsClasses from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl.js'

const buildControlsMapArray=[
    {
        ingredientLabel:'Salad',
        ingredientType:'salad'
    },
    {
        ingredientLabel:'Meat',
        ingredientType:'meat'
    },
    {
        ingredientLabel:'Bacon',
        ingredientType:'bacon'
    },
    {
        ingredientLabel:'Cheese',
        ingredientType:'cheese'
    },
]
function renderBuildControls({addIngredient,removeIngredient,disabledLessBtnsMap}){
    return buildControlsMapArray.map(buildControlMap=>(
        <BuildControl 
            ingredientLabel={buildControlMap.ingredientLabel} 
            key={buildControlMap.ingredientLabel}
            lessClickHandler={removeIngredient.bind(null,buildControlMap.ingredientType)}
            moreClickHandler={addIngredient.bind(null,buildControlMap.ingredientType)}
            disableLessBtn={disabledLessBtnsMap[buildControlMap.ingredientType]}

        />
    ))
}
const buildControls=(props)=>(
    <div className={BuildControlsClasses.BuildControls}>
        {renderBuildControls(props)}
    </div>
);

export default buildControls;