import React,{Component} from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {authLogout} from '../../../store/actions';

class AuthLogout extends Component{
    componentDidMount(){
        this.props.dispatchAuthLogout()
    }
    render(){
        return <Redirect to="/"/>
    }
}

function mapDispatchActionsToProps(dispatch){
    return {
        dispatchAuthLogout:()=>dispatch(authLogout())
    }
}
export const AuthLogoutWithRedux=connect(null,mapDispatchActionsToProps)(AuthLogout)
