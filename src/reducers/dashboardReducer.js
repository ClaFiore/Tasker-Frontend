let initialState = {view: 'team_member',
                    activity: 'calendar',
                    projects: []}


let dashboardReducer = (state = initialState, action) => {
    switch(action.type){
        case 'changeActivity':
            return {...state,
            activity: action.payload}
        case 'all_projects':
            return {...state,
            projects: action.payload}
        default:
            return state
    }       
}

export default dashboardReducer
