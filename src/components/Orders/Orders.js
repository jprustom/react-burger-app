import React from 'react';
import Order from './Order/Order.js';
import axios from '../../axios-orders.js';
import Spinner from '../UI/Spinner/Spinner.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js'
class Orders extends React.Component{

    state={
        loadingOrders:true,
        orders:null
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then((response)=>{
                const fetchedOrders=[]
                for (let orderId in response.data){
                    fetchedOrders.push({
                        orderId,
                        ...response.data[orderId]
                    })
                }
                this.setState({
                    orders: fetchedOrders,
                    loadingOrders:false
                })
            })
            .catch(err=>{
                this.setState({
                    loadingOrders:false
                })
            })
    }
    render(){
        return this.state.loadingOrders
            ?<Spinner/>
            :<React.Fragment>
                {
                    this.state.orders
                        .map(order=><Order 
                                key={order.orderId}
                                orderTotalPrice={+order.totalPrice} 
                                orderBurgerIngredientsMap={order.ingredientsMap}/>)
                }  
            </React.Fragment>
    }
}


export default withErrorHandler(Orders,axios);