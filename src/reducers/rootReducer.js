// import all your reducers
import {combineReducers} from 'redux'
import loginReducer from './loginReducer'
import dashboardReducer from './dashboardReducer'

let initialState = {baseUrl: 'http://localhost:3000/api/v1/'}

let urlReducer = (state = initialState, action) => {
    return initialState
}

const rootReducer = combineReducers({urlReducer, loginReducer, dashboardReducer})

export default rootReducer