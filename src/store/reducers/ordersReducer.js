import {PURCHASE_BURGER_FAIL,PURCHASE_BURGER_SUCCESS} from '../actions/actionsTypes.js';
const ordersInitialState={
    processingOrder:false,
    orderData:null
};
function ordersReducer(ordersOldState=ordersInitialState,ordersAction){
    switch(ordersAction.type){
        case PURCHASE_BURGER_SUCCESS:
            console.log(ordersAction);
            return 1;
        case PURCHASE_BURGER_FAIL:
            console.log("FAILLL");
            return -1;
        default:
            return ordersOldState;
    }
}
export default ordersReducer;