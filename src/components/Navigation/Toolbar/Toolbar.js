import React from 'react';
import ToolbarClasses from './Toolbar.module.css';
import Logo from "../Logo/Logo.js";
import NavigationItems from '../NavigationItems/NavigationItems.js'
import SideDrawerToggle from './SideDrawerToggle/SideDrawerToggle.js'

const toolbar=props=>(
    <header className={ToolbarClasses.Toolbar}>
        <SideDrawerToggle sideDrawerToggleHandler={props.sideDrawerToggleHandler}/>
        <Logo/>
        <NavigationItems/>
        
    </header>
)

export default toolbar;