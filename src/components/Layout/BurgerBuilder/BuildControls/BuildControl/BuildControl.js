import React from 'react';
import BuildControlClasses from './BuildControl.module.css'
const buildControl=(props)=>(
    <div className={BuildControlClasses.BuildControl}>
        <div className={BuildControlClasses.Label}>{props.ingredientLabel}</div>
        <button className={BuildControlClasses.Less}>Less</button>
        <button className={BuildControlClasses.More}>More</button>
    </div>
);

export default buildControl;