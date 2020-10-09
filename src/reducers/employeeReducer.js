let initialState = {current_user: {employee: 'loading'},
                    employee_id: ''}


let employeeReducer = (state = initialState, action) => {
    switch(action.type){
        case 'add_current_user':
            return {...state,
            current_user: action.payload}
        case 'employeeId':
            return {...state,
                employee_id: action.payload
            }
        default:
            return state
        }
    }

export default employeeReducer