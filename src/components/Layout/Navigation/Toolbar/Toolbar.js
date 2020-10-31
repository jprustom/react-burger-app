import React from 'react';
import ToolbarClasses from './Toolbar.module.css';
import Logo from "../Logo/Logo.js";
import NavigationItems from '../NavigationItems/NavigationItems.js'

const toolbar=props=>(
    <header className={ToolbarClasses.Toolbar}>
        <div>MENU</div>
        <Logo />
        <NavigationItems/>
        
    </header>
)

export default toolbar;