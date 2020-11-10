import React, {Component} from 'react'
import Layout from '../../hoc/Layout/Layout.js'
import Checkout from '../../components/BurgerBuilder/Checkout/Checkout.js'
import BurgerBuilder from '../../components/BurgerBuilder/BurgerBuilder.js'
import {Route} from 'react-router-dom';

class App extends Component {
 render(){
   return (
     <React.Fragment>
       <Layout>
          <Route path='/' exact component={BurgerBuilder}/>
          <Route path='/checkout' component={Checkout}/>
       </Layout>
      </React.Fragment>
   )
 }
}

export default App;
