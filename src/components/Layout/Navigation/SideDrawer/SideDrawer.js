import React from 'react';
import Logo from '../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js'
import SideDrawerClasses from './SideDrawer.module.css';

const sideDrawer=(props)=>{
    return (
        <div className={SideDrawerClasses.SideDrawer}>
            <Logo sideDrawer/>
            <NavigationItems/>
        </div>
    )
}

export default sideDrawer;