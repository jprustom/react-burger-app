import React, {Component} from 'react'
import Layout from '../../components/Layout/Layout'
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder.js'

class App extends Component {
 render(){
   return (
     <React.Fragment>
       <Layout>
          <BurgerBuilder/>
       </Layout>
      </React.Fragment>
   )
 }
}

export default App;
