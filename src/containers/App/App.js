import React, {Component} from 'react'
import Layout from '../../hoc/Layout/Layout.js'
import BurgerBuilder from '../../components/BurgerBuilder/BurgerBuilder.js'

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
