let initialState = {current_user: {employee: 'loading'},
                    managed_members: []}


let employeeReducer = (state = initialState, action) => {
    switch(action.type){
        case 'add_current_user':
            return {...state,
            current_user: action.payload}
        case 'all_managed_members':
            return {...state,
            managed_members: action.payload}
        default:
            return state
        }
    }

export default employeeReducer