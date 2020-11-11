import React from 'react';
import Button from '../../UI/Button/Button.js'
import ContactDataClasses from './ContactData.module.css';
import axios from '../../../axios-orders.js';
import Spinner from '../../UI/Spinner/Spinner.js'
import {withRouter} from 'react-router-dom'
import Input from '../../UI/Input/Input.js'
import InputClasses from '../../UI/Input/Input.module.css'

class ContactData extends React.Component{
    contactDataFormRef=React.createRef()
    state={
        processingOrder:false,
        name:{
            value:null,
            ref:React.createRef()
        },
        email:{
            value:null,
            ref:React.createRef()
        },
        streetName:{
            value:null,
            ref:React.createRef()
        },
        postalCode:{
            value:null,
            ref:React.createRef()
        },
        deliveryMethod:{
            value:'fastest'
        }
    }
    isFormValid(){
        for (let inputElementName in this.state){
            const inputElement=this.state[inputElementName]
            const isInput=inputElement.hasOwnProperty('ref')
            if (!isInput) continue;
            const inputElementDOM = inputElement.ref.current;
            if (inputElementDOM.checkValidity())
                continue;
            inputElement.ref.current.classList.add(InputClasses.InputElementInvalid)
        }
        if (!this.contactDataFormRef.current.reportValidity())
            return false;
        return true;
    }
    saveOrder(){
        this.setState({
            processingOrder:true
        })
        const orderToSave={
            ingredientsMap:this.props.burgerIngredientsMap,
            totalPrice:this.props.totalPrice+'$',
            deliveryMethod:this.state.deliveryMethod,
            contactDetails:{
                name:this.state.name.value,
                email:this.state.email.value,
                streetName:this.state.postalCode.value,
                postalCode:this.state.streetName.value
            }
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
    orderHandler(event){
        event.preventDefault();
        if (this.isFormValid())
            this.saveOrder()
    }
    inputChanged(contactOrderDataToAssign,event){
        this.setState({
            [contactOrderDataToAssign]:{
                ...this.state[contactOrderDataToAssign],
                value:event.target.value
            }
        },()=>{
            const inputElementRef = this.state[contactOrderDataToAssign].ref;
            if (!inputElementRef)
                return
            const inputElementDom=inputElementRef.current;
            if (inputElementDom.checkValidity() && inputElementDom.classList.contains(InputClasses.InputElementInvalid))
                inputElementDom.classList.remove(InputClasses.InputElementInvalid)
        })
        
    }
    render(){
        return (
            this.state.processingOrder
                ?<Spinner/>
                :<form ref={this.contactDataFormRef} noValidate onSubmit={this.orderHandler.bind(this)} className={ContactDataClasses.ContactData}>
                    <h4>Enter Your Contact Data Here</h4>
                    <Input inputRef={this.state.name.ref} onChange={this.inputChanged.bind(this,'name')} label="name" type="text" name="name" placeholder="Your Name" required/>
                    <Input inputRef={this.state.email.ref} onChange={this.inputChanged.bind(this,'email')} label="email" type='email' name="email" placeholder='Enter Your Email' required/>
                    <Input inputRef={this.state.streetName.ref} onChange={this.inputChanged.bind(this,'streetName')} label="street name" type="text" name="streetName" placeholder="Your Street Name" required/>
                    <Input inputRef={this.state.postalCode.ref} onChange={this.inputChanged.bind(this,'postalCode')} label="postal code" minLength={4} type="text" name="postalCode" placeholder="Postal Code" required/>
                    <Input onChange={this.inputChanged.bind(this,'deliveryMethod')} inputType="select" label="choose a delivery method" options={[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]}></Input>
                    <Button submit btnType="Success">ORDER</Button>
                </form>  
        )
    }
}

export default withRouter(ContactData);