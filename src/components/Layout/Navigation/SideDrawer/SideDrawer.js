import React from 'react';
import Logo from '../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js'
import SideDrawerClasses from './SideDrawer.module.css';
import Backdrop from "../../UI/Backdrop/Backdrop.js";
const sideDrawer=(props)=>{
    return (
        <React.Fragment>
            <Backdrop showBackdrop={props.openSideDrawer} backdropClicked={props.backdropClicked}/>
            <div className={`${SideDrawerClasses.SideDrawer}  ${props.openSideDrawer?SideDrawerClasses.Open:SideDrawerClasses.Close}`}>
                <Logo sideDrawer/>
                <NavigationItems/>
            </div>
        </React.Fragment>
    )
}

export default sideDrawer;