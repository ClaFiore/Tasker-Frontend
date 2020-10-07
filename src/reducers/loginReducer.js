let initialState = {email: '', password: ''}


let loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'new_email_value':
        return {...state, 
                email: action.payload}
        case 'new_password_value':
            return {...state,
                    password: action.payload}
        default:
            return state
    }
}

export default loginReducer