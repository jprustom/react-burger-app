import {combineReducers} from 'redux';
import burgerReducer from './burgerReducer.js';
import ordersReducer from './ordersReducer.js';
export default combineReducers({
    burger:burgerReducer,
    order:ordersReducer
})