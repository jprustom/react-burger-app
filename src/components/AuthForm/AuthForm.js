import React,{Component} from 'react';
import AuthClasses from './AuthForm.module.css'
import Button from '../UI/Button/Button.js'
import * as actions from '../../store/actions'
import {connect} from 'react-redux';
import Spinner from '../UI/Spinner/Spinner.js';

//Unlike ContactData.js, I decided to not use the Input component
class Auth extends Component{
    state={
        email:{
            value:null,
            ref:React.createRef()
        },
        password:{
            value:null,
            ref:React.createRef()
        }
    }
    inputChanged(inputName,event){
        const newValue=event.target.value;
        this.setState({
            [inputName]:{
                ...this.state[inputName],
                value:newValue
            }
        })
    }
    authReqHandler(event){
        event.preventDefault();
        this.props.dispatchFetchAuthReq(this.state.email.value,this.state.password.value,this.props.authMode);
    }
    componentWillUnmount() {
        this.props.dispatchClearAuthError();
    }
    render(){
        if (!['signUp','signIn'].includes(this.props.authMode))
            throw new Error('Should provide valid authMode')
        return <form onSubmit={this.authReqHandler.bind(this)} className={AuthClasses.AuthForm}>
                    {  
                        this.props.loadingAuth
                            ?<Spinner/>
                            :<React.Fragment>
                                {this.props.authErrorMessage && <h1>{'Error: '+this.props.authErrorMessage.replace('_',' ')}</h1>}
                                <label for="email">E-mail</label>
                                <input className={this.props.authErrorMessage&&AuthClasses.invalid} name="email" type="email" onChange={this.inputChanged.bind(this,'email')} ref={this.state.email.ref} required/>
                                <label for="password" name="password">Password</label>
                                <input className={this.props.authErrorMessage&&AuthClasses.invalid} type="password" minLength='5' onChange={this.inputChanged.bind(this,'password')} ref={this.state.password.ref} required/>
                                <Button submit btnType="Success">{this.props.authMode==='signUp'?'Sign Up':'Sign In'}</Button>
                            </React.Fragment>
                    }
                </form>
    }
}
function mapDispatchActionsToProps(dispatch){
    return {
        dispatchFetchAuthReq:(email,password,authMode)=>dispatch(actions.authReq(email,password,authMode)),
        dispatchClearAuthError:()=>dispatch(actions.clearAuthError())
    }
}
function mapStateToProps({auth}){
    return auth
}
const AuthWithRedux=connect(mapStateToProps,mapDispatchActionsToProps)(Auth)
export default AuthWithRedux;