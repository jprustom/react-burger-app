import React from 'react';
import BuildControlClasses from './BuildControl.module.css'
const buildControl=(props)=>(
    <div className={BuildControlClasses.BuildControl}>
        <div className={BuildControlClasses.Label}>{props.ingredientLabel}</div>
        <button disabled={props.disableLessBtn} onClick={props.lessClickHandler} className={BuildControlClasses.Less}>Less</button>
        <button onClick={props.moreClickHandler} className={BuildControlClasses.More}>More</button>
    </div>
);

export default buildControl;