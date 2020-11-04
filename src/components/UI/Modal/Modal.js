import React from 'react';
import ModalClasses from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop.js';

const modal=(props)=>(
    <React.Fragment>
        <Backdrop showBackdrop={props.showModal} backdropClicked={props.modalClosed}/>
        <div className={`${ModalClasses.Modal} ${props.showModal?ModalClasses.Show:ModalClasses.Hide}`}>
            {props.showModal && props.children}
        </div>
    </React.Fragment>
)

export default modal;