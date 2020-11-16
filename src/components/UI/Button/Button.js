import React from 'react';
import BtnClasses from './Button.module.css';

const button=props=>(
    <button type={props.submit && 'submit'} disabled={props.btnDisabled} className={`${BtnClasses.Button} ${BtnClasses[props.btnType]}`} onClick={props.btnClicked}>
        {props.children}
    </button>
)

export default button;