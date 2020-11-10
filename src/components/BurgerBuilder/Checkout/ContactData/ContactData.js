import React from 'react';
import Button from '../../../UI/Button/Button.js'
import ContactDataClasses from './ContactData.module.css';

class ContactData extends React.Component{
    state={
        name:'',
        email:'',
        address:{
            streetName:'',
            postalCode:''
        }
    }
    orderHandler(event){
        event.preventDefault();
        
    }
    render(){
        return (
            <form className={ContactDataClasses.ContactData}>
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

export default ContactData;