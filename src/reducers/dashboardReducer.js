let initialState = {view: 'team member',
                    activity: 'calendar',
                    projects: [],
                    filtered_projects: []}


let dashboardReducer = (state = initialState, action) => {
    switch(action.type){
        case 'change_view':
                    return{...state,
                            view: action.payload}
        case 'changeActivity':
                    return {...state,
                            activity: action.payload}
        case 'all_projects':
                    return {...state,
                            projects: action.payload}
        case 'filtered_projects':
                    return{...state,
                            filtered_projects: action.payload}
        default:
            return state
    }       
}

export default dashboardReducer
