import React, {Component} from 'react'
import LayoutClasses from './Layout.module.css'
import Toolbar from './Navigation/Toolbar/Toolbar.js';
import SideDrawer from './Navigation/SideDrawer/SideDrawer.js'

class Layout extends Component{
    state={
        openSideDrawer:false
    }
    toggleSideDrawer(){
        this.setState((prevState)=>{
            return {
                openSideDrawer:!prevState.openSideDrawer
            }
        })  
    }
    render(){
        return (
            <React.Fragment>
                <Toolbar sideDrawerToggleHandler={this.toggleSideDrawer.bind(this)}/>
                <SideDrawer openSideDrawer={this.state.openSideDrawer} backdropClicked={this.toggleSideDrawer.bind(this)}/>
                <main className={LayoutClasses.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
export default Layout