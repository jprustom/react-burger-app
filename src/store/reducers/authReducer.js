import * as actionTypes from '../actions/actionsTypes.js'

const locallyStoredUserToken=localStorage.getItem('userToken');
const locallyStoredUserTokenExpirationDate=localStorage.getItem('userTokenExpirationDate');
const userToken=locallyStoredUserToken
    ?Date.now()<locallyStoredUserTokenExpirationDate
        ?locallyStoredUserToken
        :null
    :null
const authInitialState={
    userToken,
    userId:localStorage.getItem('userId'),
    authErrorMessage:null,
    loadingAuth:false
}
const authReqStart=(oldAuthState)=>{
    return {
        ...oldAuthState,
        authErrorMessage:undefined,
        loadingAuth:true
    }
}
const authReqFail=({authErrorMessage})=>{
    return {
        ...authInitialState,
        authErrorMessage
    }
}
const authReqSuccess=({userId,userToken,userTokenExpirationDate})=>{
    localStorage.setItem('userId',userId)
    localStorage.setItem('userToken',userToken)
    localStorage.setItem('userTokenExpirationDate',userTokenExpirationDate)
    return {
        authErrorMessage:null,
        loadingAuth:false,
        userId,
        userToken
    }
}
const authClearError=(authOldState)=>{
    return {
        ...authOldState,
        authErrorMessage:null
    }
}
const authLogout=()=>{
    localStorage.removeItem('userId')
    localStorage.removeItem('userToken')
    localStorage.removeItem('userTokenExpirationDate')
    return {
        userToken:null,
        userId:null,
        authErrorMessage:null,
        loadingAuth:false
    }
}
function authReducer(authOldState=authInitialState,authAction){
    switch(authAction.type){
        case actionTypes.AUTH_REQ_START:
            return authReqStart(authOldState);
        case actionTypes.AUTH_REQ_SUCCESS:
            return authReqSuccess(authAction);
        case actionTypes.AUTH_REQ_FAIL:
            return authReqFail(authAction);
        case actionTypes.AUTH_CLEAR_ERROR:
            return authClearError(authOldState)
        case actionTypes.AUTH_LOGOUT:
            return authLogout()
        default:
            return authOldState
    }

}
export default authReducer;