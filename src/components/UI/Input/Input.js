import React from 'react';
import InputClasses from './Input.module.css';

function generateInputElement(props){
    const inputType=props.inputType;
    const propsToAssociate={...props};
    const refToAssign=props.inputRef;
    delete propsToAssociate.inputType
    delete propsToAssociate.label
    delete propsToAssociate.inputRef
    switch (inputType){
        case 'textarea':
            console.log(...propsToAssociate)
            return <textarea {...propsToAssociate}/>
        case 'input':
            return <input ref={refToAssign} className={InputClasses.InputElement} {...propsToAssociate}/>
        case 'select':
            return <select onChange={propsToAssociate.onChange}>
                {
                    propsToAssociate.options.map(
                        ({value,displayValue})=>
                            <option key={value} value={value}>{displayValue}</option>
                    )
                }
            </select>
        default:
            return <input ref={refToAssign} className={InputClasses.InputElement} {...propsToAssociate}/>
    }
}
const input=(props)=>{
    const inputElement=generateInputElement(props)
    return <div className={InputClasses.Input}>
        <label className={InputClasses.Label}>{props.label}</label>
        {inputElement}
    </div>
}

export default input;