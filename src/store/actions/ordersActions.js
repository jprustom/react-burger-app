import {FETCH_ORDERS_REQ_FAIL,FETCH_ORDERS_REQ_SUCCESS,FETCH_ORDERS_REQ_START,SHOW_CHECKOUT,PURCHASE_BURGER_START_REQ,PURCHASE_BURGER_FAIL,PURCHASE_BURGER_SUCCESS} from './actionsTypes.js';
import {initBurgerFetch} from './burgerActions.js';
import axios from '../../axios-orders.js';

export function showCheckout(){
    return {
        type:SHOW_CHECKOUT
    };
}
function purchaseBurgerStartReq(){
    return {
        type:PURCHASE_BURGER_START_REQ
    }
}
function purchaseBurgerFail(orderError){
    return {
        type:PURCHASE_BURGER_FAIL,
        orderError
    }
}
function puchaseBurgerSuccess(savedOrder){
    return{
        type:PURCHASE_BURGER_SUCCESS,
        savedOrder
    }
}
export function purchaseBurgerReq(orderToSave){
    return function(dispatch){
        dispatch(purchaseBurgerStartReq()); 
        axios.post('/orders.json',orderToSave)
            .then((response)=>{
                if (!response)
                    throw new Error('no response after fetching orders!')
                const savedOrder={
                    ...orderToSave,
                    orderId:response.data.name
                }
                dispatch(puchaseBurgerSuccess(savedOrder))
                dispatch(initBurgerFetch())
            })
            .catch((err)=>{
                dispatch(purchaseBurgerFail(err))
                console.log(err)
                
            })
    }
}
function fetchOrdersStartReq(){
    console.log('fetching orders')
    return {
        type:FETCH_ORDERS_REQ_START
    }
}
function fetchOrdersReqSuccess(fetchedOrders){
    console.log(fetchedOrders)
    return {
        fetchedOrders,
        type:FETCH_ORDERS_REQ_SUCCESS
    }
}
function fetchOrdersReqFail(fetchOrdersError){
    return {
        type:FETCH_ORDERS_REQ_FAIL,
        fetchOrdersError
    }
}
export function fetchOrdersReq(){
    return function(dispatch){
        dispatch(fetchOrdersStartReq());
        axios.get('/orders.json')
            .then((response)=>{
                const fetchedOrders=[]
                for (let orderId in response.data){
                    fetchedOrders.push({
                        orderId,
                        ...response.data[orderId]
                    })
                }
                dispatch(fetchOrdersReqSuccess(fetchedOrders))
            })
            .catch(err=>{
                dispatch(fetchOrdersReqFail())
            })
    }
}