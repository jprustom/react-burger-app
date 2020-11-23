import React, {Component} from 'react'
import Layout from '../hoc/Layout/Layout.js'
import Checkout from '../components/Checkout/Checkout.js'
import BurgerBuilder from '../components/BurgerBuilder/BurgerBuilder.js'
import {Route,Redirect, Switch} from 'react-router-dom';
import Orders from "../components/Orders/Orders.js";
import {AuthForm,AuthLogout} from '../components/Auth';
import {connect} from 'react-redux';

class App extends Component {
  render(){
    return (
    <React.Fragment>
      <Layout>
        {
          this.props.isAuthenticated
            ?<Switch>
              <Route path='/' exact component={BurgerBuilder}/> 
              <Route path='/auth/signOut' exact component={AuthLogout}/>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/orders' component={Orders}/> 
              <Route path='/auth/signup' exact component={()=><AuthForm authMode='signUp'/>}/> 
              <Route path='/auth/signIn' exact component={()=><AuthForm authMode='signIn'/>}/>
              <Redirect to="/"/>
            </Switch>
            :<Switch>
              <Route path='/' exact component={BurgerBuilder}/> 
              <Route path='/auth/signup' exact component={()=><AuthForm authMode='signUp'/>}/> 
              <Route path='/auth/signIn' exact component={()=><AuthForm authMode='signIn'/>}/>
              <Redirect to="/"/>
          </Switch>
        }
      </Layout>
      </React.Fragment>
  )
}
}
function mapStateToProps({auth}){
  return {
    isAuthenticated:auth.userToken!=null
  }
}
export default connect(mapStateToProps)(App);
