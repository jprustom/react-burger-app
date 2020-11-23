import {FETCH_ORDERS_REQ_FAIL,FETCH_ORDERS_REQ_SUCCESS,FETCH_ORDERS_REQ_START,SHOW_CHECKOUT,PURCHASE_BURGER_START_REQ,PURCHASE_BURGER_FAIL,PURCHASE_BURGER_SUCCESS} from '../actions/actionsTypes.js';

const ordersInitialState={
    orderProcessed:false,
    processingOrder:false,
    fetchedOrders:null,
    fetchingOrders:false
};
function purchaseBurgerSuccess(ordersOldState,savedOrder){
    return {
        ...ordersOldState,
        // orders:ordersOldState.orders.concat(savedOrder),
        processingOrder:false,
        orderProcessed:true
    }
}
function startBurgerReq(ordersOldState){
    return {
        ...ordersOldState,
        processingOrder:true,
        orderProcessed:false
    }
}

function purchaseBurgerFail(ordersOldState, orderError) {
    console.log('Error while purchasing burger:', orderError);
    return {
        ...ordersOldState,
        processingOrder: false,
        orderProcessed: false
    };
}
function showCheckout(ordersOldState){
    return {
        ...ordersOldState,
        processingOrder: false,
        orderProcessed: false
    }
}
function fetchOrdersReqStart(ordersOldState){
    return {
        ...ordersOldState,
        fetchingOrders:true
    }
}
function fetchOrdersReqSuccess(ordersOldState,fetchedOrders){
    return {
        ...ordersOldState,
        fetchedOrders,
        fetchingOrders:false
    }
}
function fetchOrdersReqFail(fetchedOrdersError){
    return ordersInitialState
}
function ordersReducer(ordersOldState=ordersInitialState,ordersAction){
    switch(ordersAction.type){
        case PURCHASE_BURGER_START_REQ:
            return startBurgerReq(ordersOldState);
        case PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(ordersOldState,ordersAction.savedOrder);
        case SHOW_CHECKOUT:
            return showCheckout(ordersOldState);
        case PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(ordersOldState,ordersAction.orderError);
        case FETCH_ORDERS_REQ_START:
            return fetchOrdersReqStart(ordersOldState);
        case FETCH_ORDERS_REQ_SUCCESS:
            return fetchOrdersReqSuccess(ordersOldState,ordersAction.fetchedOrders)
        case FETCH_ORDERS_REQ_FAIL:
            return fetchOrdersReqFail(ordersAction.fetchedOrdersError);
        default:
            return ordersOldState;
    }
}
export default ordersReducer;

