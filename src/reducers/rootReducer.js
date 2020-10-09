// import all your reducers
import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import dashboardReducer from './dashboardReducer'
import employeeReducer from './employeeReducer'
import loginReducer from './loginReducer'


const rootReducer = combineReducers({
    dashboardReducer, 
    employeeReducer,
    loginReducer})

export default rootReducer

