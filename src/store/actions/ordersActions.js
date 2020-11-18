import {PURCHASE_BURGER_FAIL,PURCHASE_BURGER_SUCCESS} from './actionsTypes.js';
import axios from '../../axios-orders.js';

function purchaseBurgerFail(orderError){
    return {
        type:PURCHASE_BURGER_FAIL,
        orderError
    }
}
function burgerSuccess(savedOrder){
    return{
        type:PURCHASE_BURGER_SUCCESS,
        savedOrder
    }
}
export function purchaseBurgerReq(orderToSave){
    return function(dispatch){
        axios.post('/orders.json',orderToSave)
            .then((response)=>{
                if (!response){
                    console.log('no response')
                    return;
                }
                const savedOrder={
                    ...orderToSave,
                    orderId:response.data.name
                }
                dispatch(burgerSuccess(savedOrder))

                // this.props.dispatchResetIngredientsAction()
            })
            .catch((err)=>{
                dispatch(purchaseBurgerFail(err))
                console.log(err)
                
            })
    }
}