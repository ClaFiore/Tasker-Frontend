let initialState = {view: 'team_member',
                    activity: 'calendar',
                    projects: [],
                    filtered_projects: []}


let dashboardReducer = (state = initialState, action) => {
    switch(action.type){
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
