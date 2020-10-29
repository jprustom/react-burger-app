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
const buildControlsToRender=buildControlsMapArray.map(buildControlMap=>(
    <BuildControl ingredientLabel={buildControlMap.ingredientLabel} key={buildControlMap.ingredientLabel}/>
))
const buildControls=(props)=>(
    <div className={BuildControlsClasses.BuildControls}>
        {buildControlsToRender}
    </div>
);

export default buildControls;