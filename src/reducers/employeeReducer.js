let initialState = {current_user: {}}


let employeeReducer = (state = initialState, action) => {
    switch(action.type){
        case 'add_current_user':
            return {...state,
            current_user: action.payload}
        default:
            return state
        }
    }

export default employeeReducer