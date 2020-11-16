import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App.js';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import ingredientsReducer from './store/reducers/ingredientsReducer/ingredientsReducer.js';

const componedEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleWare=(store)=>{
  return (next)=>{
    return (action)=>{
      console.log(`dispatching `,action);
      const result=next(action);
      console.log(`next state is `,store.getState());
      return result;
    }
  }
}
const store=createStore(ingredientsReducer,componedEnhancers(applyMiddleware(loggerMiddleWare)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
