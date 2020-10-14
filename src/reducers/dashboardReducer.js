let initialState = {view: 'team member',
                    activity: 'calendar',
                    projects: [],
                    filtered_projects: [],
                    tasks: [],
                    filtered_tasks: [],}


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
        case 'filtered_tasks':
                return  {...state,
                        filtered_tasks: action.payload}
        case 'add_project':
                        return {...state,
                                projects: [...state.projects, action.payload],
                                filtered_projects: [...state.filtered_projects, action.payload]}
        case 'update_project':
                return {...state, 
                        filtered_projects: state.filtered_projects.map(proj => {
                                if (proj.id === action.payload.id){
                                return {
                                        ...proj,
                                        title: action.payload.title,
                                        content: action.payload.content,
                                        status: action.payload.status,
                                        due_by: action.payload.due_by
                                }
                                }else{
                                        return proj
                                }}),
                        projects: state.projects.map(proj => {
                                if (proj.id === action.payload.id){
                                return {
                                        ...proj,
                                        title: action.payload.title,
                                        content: action.payload.content,
                                        status: action.payload.status,
                                        due_by: action.payload.due_by
                                }
                        }else{
                                return proj
                        }
                        })
                }
        case 'deleted_project':
                return {...state, 
                        filtered_projects: state.filtered_projects.filter(proj => proj.id !== action.payload),
                        projects: state.projects.filter(proj => proj.id !== action.payload)
                }
        case 'all_tasks':
                return{
                        ...state,
                        tasks: action.payload,
                        filtered_tasks: action.payload
                }
        case 'add_task':
                return{...state,
                        tasks: [...state.tasks, action.payload],
                        filtered_tasks: [...state.filtered_tasks, action.payload]
                }
        case 'edit_task':
                return {...state, 
                        filtered_tasks: state.filtered_tasks.map(task => {
                                if (task.id === action.payload.id){
                                return {
                                        ...task,
                                        title: action.payload.title,
                                        content: action.payload.content,
                                        status: action.payload.status,
                                        start: action.payload.start,
                                        end: action.payload.end,
                                        priority: action.payload.priority,
                                        project_id: action.payload.project_id
                                }
                                }else{
                                        return task
                                }}),
                        tasks: state.tasks.map(task => {
                                if (task.id === action.payload.id){
                                return {
                                        ...task,
                                        title: action.payload.title,
                                        content: action.payload.content,
                                        status: action.payload.status,
                                        start: action.payload.start,
                                        end: action.payload.end,
                                        priority: action.payload.priority,
                                        project_id: action.payload.project_id
                                }
                        }else{
                                return task
                        }
                        })
                }
        default:
            return state
    }       
}

export default dashboardReducer
