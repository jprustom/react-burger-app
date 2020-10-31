import React from 'react';
import NavigationItemClasses from './NavigationItem.module.css';

const navigationItem=props=>(
    <li className={NavigationItemClasses.NavigationItem}>
        <a 
            href={props.navigationItemLink}
            className={props.navigationItemActive?NavigationItemClasses.active:null}
        >
                {props.children}
        </a>
    </li>
)

export default navigationItem;