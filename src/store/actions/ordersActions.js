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
export function purchaseBurgerReq(orderToSave,userToken){
    return function(dispatch){
        dispatch(purchaseBurgerStartReq()); 
        axios.post(`/orders.json?auth=${userToken}`,orderToSave)
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
    return {
        type:FETCH_ORDERS_REQ_START
    }
}
function fetchOrdersReqSuccess(fetchedOrders){
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
export function fetchOrdersReq(userToken){
    return function(dispatch){
        dispatch(fetchOrdersStartReq());
        axios.get(`/orders.json?auth=${userToken}`)
            .then((response)=>{
                const fetchedOrders=[]
                for (let orderId in response.data){
                    const orderData=response.data[orderId]
                    if (orderData['contactDetails']['userId']!==localStorage.getItem('userId'))
                        continue;
                    fetchedOrders.push({
                        ...orderData
                    })
                }
                dispatch(fetchOrdersReqSuccess(fetchedOrders))
            })
            .catch(err=>{
                dispatch(fetchOrdersReqFail())
            })
    }
}