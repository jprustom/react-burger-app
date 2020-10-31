import React from 'react'
import LayoutClasses from './Layout.module.css'
import Toolbar from './Navigation/Toolbar/Toolbar.js';
import SideDrawer from './Navigation/SideDrawer/SideDrawer.js'

const layout=(props)=>(
    <React.Fragment>
        <Toolbar/>
        <SideDrawer/>
        <main className={LayoutClasses.Content}>
            {props.children}
        </main>
    </React.Fragment>
)
export default layout