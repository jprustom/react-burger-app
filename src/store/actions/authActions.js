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
const authReqSuccess=(userId,userToken,userTokenExpiresIn)=>{
    const userTokenExpirationDate=Date.now()+userTokenExpiresIn*1000
    return {
        type:actionTypes.AUTH_REQ_SUCCESS,
        userId,
        userToken,
        userTokenExpirationDate
    }
}
const authReqStart=()=>{
    return {
        type:actionTypes.AUTH_REQ_START
    }
}
const authReqFail=(authError)=>{
    let authErrorMessage;
    const isFirebaseError=authError.response!=null
    if (isFirebaseError)
        authErrorMessage=authError.response.data.error.message
    else authErrorMessage=authError.message

    return {
        type:actionTypes.AUTH_REQ_FAIL,
        authErrorMessage
    }
}
const watchAuthTimeout=(expirationTime)=>{
    return function(dispatch){
        setTimeout(()=>{
            dispatch(authLogout())
        },expirationTime*1000)
    }
}
export function authReq(email,password,authMode){
    if (!['signUp','signIn'].includes(authMode))
        throw new Error('Should provide valid authMode');
    return function(dispatch){
        dispatch(authReqStart())
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
                const {localId: userId,idToken: userToken,expiresIn: userTokenExpiresIn,refreshToken}=response.data;
                dispatch(authReqSuccess(userId,userToken,userTokenExpiresIn))
                dispatch(watchAuthTimeout(userTokenExpiresIn))
            })
            .catch(function(authError){
                dispatch(authReqFail(authError))
            })
    }
}