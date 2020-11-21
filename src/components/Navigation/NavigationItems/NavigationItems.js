import React from 'react';
import NavigationItemsClasses from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem.js';
import {connect} from 'react-redux';


const navigationItems=props=>(
    <nav>
        <ul className={NavigationItemsClasses.NavigationItems}>
        <NavigationItem exact navigationItemLink="/" >Burger Builder</NavigationItem>
        {
            props.userToken
                ?<React.Fragment>
                    <NavigationItem exact navigationItemLink="/orders">Orders</NavigationItem>
                    <NavigationItem exact navigationItemLink="/auth/signout">Sign Out</NavigationItem>
                </React.Fragment>
                :<React.Fragment>
                    <NavigationItem exact navigationItemLink="/auth/signin">Sign In</NavigationItem>
                    <NavigationItem exact navigationItemLink="/auth/signup">Sign Up</NavigationItem>
                </React.Fragment>
            
        }
    </ul>
    </nav>
)

function mapStateToProps({auth}){
    return {
        userToken:auth.userToken
    }
}
export default connect(mapStateToProps)(navigationItems);