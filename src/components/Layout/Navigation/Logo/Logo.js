import React from 'react';
import burgerLogo from "../../../../assets/images/burger-logo.png"
import LogoClasses from './Logo.module.css';

const logo=props=>(
    <div className={`${LogoClasses.Logo} ${props.sideDrawer && LogoClasses.SideDrawer}`}>
        <img alt="burger-logo" src={burgerLogo}/>
    </div>
)

export default logo;