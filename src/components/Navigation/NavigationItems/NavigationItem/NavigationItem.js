import React from 'react';
import NavigationItemClasses from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem=props=>(
    <li className={NavigationItemClasses.NavigationItem}>
        <NavLink 
            activeClassName={NavigationItemClasses.active}
            to={props.navigationItemLink}
            exact={props.exact}
        >
                {props.children}
        </NavLink>
    </li>
)

export default navigationItem;