let initialState = {view: 'team member',
                    activity: 'calendar',
                    projects: [],
                    filtered_projects: [],
                    tasks: [],
                    filtered_tasks: [],
                    notifications: [],
                    unread_notifications: []
                    }


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
        case 'delete_task':
                return {
                        ...state,
                        tasks: state.tasks.filter(task => task.id !== action.payload),
                        filtered_tasks: state.filtered_tasks.filter(task => task.id !== action.payload)
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
        case 'my_notifications':
                return {...state,
                        notifications: action.payload,
                        unread_notifications: action.payload.filter(notif => notif.read === false)}
        case 'updated_notification':
                return{...state,
                        notifications: state.notifications.map(notif => {
                                if (notif.id === action.payload.id){
                                        return {
                                                ...notif,
                                                read: true
                                        }
                                }else{
                                        return notif
                                }
                        })
        }
        case 'update_unread_notification':
                return{...state,
                        unread_notifications: state.unread_notifications.filter(notif => notif.id !== action.payload.id)
                }
        default:
            return state
    }       
}

export default dashboardReducer
