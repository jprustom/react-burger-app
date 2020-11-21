import * as actionTypes from '../actions/actionsTypes.js'
const authInitialState={
    userToken:null,
    userId:null,
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
const authReqSuccess=({userId,userToken})=>{
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
        default:
            return authOldState
    }

}
export default authReducer;