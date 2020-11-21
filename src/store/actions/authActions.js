import * as actionTypes from '../actions/actionsTypes.js';
import axios from 'axios';

export function clearAuthError(){
    return {
        type:actionTypes.AUTH_CLEAR_ERROR
    }
}
export function authLogout(){
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}
const authReqSuccess=(userId,userToken)=>{
    console.log('auth success')
    return {
        type:actionTypes.AUTH_REQ_SUCCESS,
        userId,
        userToken
    }
}
const authReqStart=(email,password)=>{
    console.log('starting request with email ',email)
    return {
        type:actionTypes.AUTH_REQ_START
    }
}
const authReqFail=(authError)=>{
    return {
        type:actionTypes.AUTH_REQ_FAIL,
        authErrorMessage: authError.response.data.error.message
    }
}
export function authReq(email,password,authMode){
    if (!['signUp','signIn'].includes(authMode))
        throw new Error('Should provide valid authMode');
    return function(dispatch){
        dispatch(authReqStart(email,password))
        const authPostBody={
            email,
            password,
            returnSecureToken:true
        }
        const authPostUrl=authMode==='signUp'
            ?'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC87-aMf24BgnY4QwVtnVaUe1u2mhEs08I'
            :'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC87-aMf24BgnY4QwVtnVaUe1u2mhEs08I'
        axios.post(authPostUrl,authPostBody)
            .then(function(response){
                console.log(response.data)
                const {localId: userId,idToken: userToken,refreshToken}=response.data;
                dispatch(authReqSuccess(userId,userToken))
            })
            .catch(function(authError){
                dispatch(authReqFail(authError))
            })
    }
}