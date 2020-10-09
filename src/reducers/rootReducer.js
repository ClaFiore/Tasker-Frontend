import {combineReducers} from 'redux'
import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
import dashboardReducer from './dashboardReducer'
import employeeReducer from './employeeReducer'
import loginReducer from './loginReducer'


const appReducer = combineReducers({
    dashboardReducer, 
    employeeReducer,
    loginReducer})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
        }
    return appReducer(state, action)
    }

export default rootReducer


  
  

