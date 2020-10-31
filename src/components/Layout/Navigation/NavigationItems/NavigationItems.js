import React from 'react';
import NavigationItemsClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems=props=>(
    <nav>
        <ul className={NavigationItemsClasses.NavigationItems}>
        <NavigationItem navigationItemLink="/" navigationItemActive>Burger Builder</NavigationItem>
        <NavigationItem navigationItemLink="/">Checkout</NavigationItem>
    </ul>
    </nav>
)

export default navigationItems;