let initialState = {logged_in: false}

let loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'logged_in':
            return {...state,
                logged_in: action.payload}
        default:
            return state
        }
    }

export default loginReducer