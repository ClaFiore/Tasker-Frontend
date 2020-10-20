let initialState = {current_user: {employee: 'loading'},
                    managed_members: [],
                    peers: []
                }


let employeeReducer = (state = initialState, action) => {
    switch(action.type){
        case 'add_current_user':
            return {...state,
            current_user: action.payload}
        case 'all_managed_members':
            return {...state,
            managed_members: action.payload}
        case 'assigned_task':
            return{
                ...state,
                managed_members: state.managed_members.map(member => {
                    if (member.id === action.payload.team_member_id){
                        return{
                            ...member,
                            tasks: [...member.tasks, action.payload]
                        }
                    }else{
                        return member
                    }
                })
            }
        case 'all_peers':
            return{
                ...state,
                peers: action.payload
            }
        default:
            return state
        }
    }

export default employeeReducer