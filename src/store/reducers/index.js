import {combineReducers} from 'redux';
import burgerReducer from './burgerReducer.js';
import ordersReducer from './ordersReducer.js';
import authReducer from './authReducer.js';
export default combineReducers({
    burger:burgerReducer,
    orders:ordersReducer,
    auth:authReducer
})