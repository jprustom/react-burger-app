import React from 'react';
import Button from '../../UI/Button/Button.js'
import ContactDataClasses from './ContactData.module.css';
import axios from '../../../axios-orders.js';
import Spinner from '../../UI/Spinner/Spinner.js'
import {withRouter} from 'react-router-dom'

class ContactData extends React.Component{
    state={
        processingOrder:false,
        name:'',
        email:'',
        address:{
            streetName:'',
            postalCode:''
        }
    }
    orderHandler(event){
        event.preventDefault();
        this.setState({
            processingOrder:true
        })
        const orderToSave={
            ingredientsMap:this.props.burgerIngredientsMap,
            totalPrice:this.state.totalPrice
        }
        axios.post('/orders.json',orderToSave)
            .then((response)=>{
                this.setState({
                    processingOrder:false,
                    // showOrderDetails:false
                })
                this.props.history.push('/')
            })
            .catch((err)=>{
                console.log(err)
                this.setState({
                    loadingOrder:false,
                    // showOrderDetails:false
                })
            })
    }
    render(){
        return (
            this.state.processingOrder
                ?<Spinner/>
                :<form className={ContactDataClasses.ContactData}>
                    <h4>Enter Your Contact Data Here</h4>
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type='email' name="email" placeholder='Enter Your Email'/>
                    <input type="text" name="streetName" placeholder="Your Street Name"/>
                    <input type="text" name="postalCode" placeholder="Postal Code"/>
                    <Button btnClicked={this.orderHandler.bind(this)} btnType="Success">ORDER</Button>
                </form>  
        )
    }
}

export default withRouter(ContactData);