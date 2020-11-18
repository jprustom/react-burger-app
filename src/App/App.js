import React, {Component} from 'react'
import Layout from '../hoc/Layout/Layout.js'
import Checkout from '../components/Checkout/Checkout.js'
import BurgerBuilder from '../components/BurgerBuilder/BurgerBuilder.js'
import {Route} from 'react-router-dom';
import Orders from "../components/Orders/Orders.js";

class App extends Component {
 render(){
   return (
     <React.Fragment>
       <Layout>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/> 
       </Layout>
      </React.Fragment>
   )
 }
}

export default App;