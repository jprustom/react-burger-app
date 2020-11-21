import React from 'react';
import NavigationItemsClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems=props=>(
    <nav>
        <ul className={NavigationItemsClasses.NavigationItems}>
        <NavigationItem exact navigationItemLink="/" >Burger Builder</NavigationItem>
        <NavigationItem exact navigationItemLink="/orders">Orders</NavigationItem>
        <NavigationItem exact navigationItemLink="/auth/signup">Sign Up</NavigationItem>
        <NavigationItem exact navigationItemLink="/auth/signin">Sign In</NavigationItem>
    </ul>
    </nav>
)

export default navigationItems;