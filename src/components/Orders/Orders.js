import React from 'react';
import Order from './Order/Order.js';
import axios from '../../axios-orders.js';
import Spinner from '../UI/Spinner/Spinner.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import {fetchOrdersReq} from '../../store/actions';
import {connect} from 'react-redux';

class Orders extends React.Component{
    componentDidMount(){
        this.props.dispatchFetchOrdersReq();
    }
    render(){
        return this.props.fetchingOrders
            ?<Spinner/>
            :<React.Fragment>
                {
                    !this.props.fetchedOrders || this.props.fetchedOrders.length===0
                        ?<h1>No Orders Yet</h1>
                        :this.props.fetchedOrders
                            .map(order=><Order 
                                key={order.orderId}
                                orderTotalPrice={order.totalPrice} 
                                orderBurgerIngredientsMap={order.ingredientsMap}/>)
                }  
            </React.Fragment>
    }
}

const ordersWithErrorHandler=withErrorHandler(Orders,axios);
function mapStateToProps({orders}){
    return {
        fetchedOrders:orders.fetchedOrders,
        fetchingOrders:orders.fetchingOrders
    }
}
function mapDispatchActionsToProps(dispatch){
    return {
        dispatchFetchOrdersReq:()=>dispatch(fetchOrdersReq())
    }
}
export default connect(mapStateToProps,mapDispatchActionsToProps)(ordersWithErrorHandler) ;