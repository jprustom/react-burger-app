import React from 'react';
import SideDrawerToggleClasses from './SideDrawerToggle.module.css'
const sideDrawerToggle=(props)=>(
    <div className={SideDrawerToggleClasses.SideDrawerToggle} onClick={props.sideDrawerToggleHandler}>
        <div></div>
        <div></div>
        <div></div>
    </div>)

export default sideDrawerToggle