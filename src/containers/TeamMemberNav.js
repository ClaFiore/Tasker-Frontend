import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
// import AddTask from '../components/AddTask';
import './TeamMemberViewCont.css'


const TeamMemberNav = props => {

    if (!props.logged){
        return(
            <Redirect to='/' />
        )
    }

    const handleMenu = (value) => {
        switch(value){
            case 'logout':
            localStorage.clear()
            props.logged_in(false)
            props.user_logout()
            break
            case 'projects':
                props.changeActivity(value)
            break
            case 'calendar':
                props.changeActivity(value)
            break
            case 'profile':
                props.changeActivity(value)
            break
            case 'switchTeam':
                if (props.view === 'team member')
                props.change_view('manager')
                else
                props.change_view('team member')
                props.changeActivity('calendar')
                break
        }
    }

    
    const filterProjects = value => {
        if (value !== 'all'){
        let all_projects = props.projects
        let filtered = all_projects.filter(p => p.status === value)
        props.filterProjects(filtered)}
        else{
            let all_projects = props.projects
            props.filterProjects(all_projects)
        }
    }

    const filterTasks = value => {
        let all_tasks = props.tasks
        let filtered
        switch(value){
            case 'all':
                props.filterTasks(all_tasks)
            break
            case 'high':
                filtered = all_tasks.filter(t => t.priority === value)
                props.filterTasks(filtered)
            break
            case 'normal':
                filtered = all_tasks.filter(t => t.priority === value)
                props.filterTasks(filtered)
            break
            case 'low':
                filtered = all_tasks.filter(t => t.priority === value)
                props.filterTasks(filtered)
            break
            default:
                filtered = all_tasks.filter(t => t.project_id === parseInt(value))
                props.filterTasks(filtered)
        }
        
    }

    

    return(
        <div className='navbar'>
            <select className='menu' onChange={(e) => handleMenu(e.target.value)}>
                <option selected disabled>Menu</option>
                <option value='calendar'>View My Calendar</option>
                <option value='profile'>View My Profile</option>
                <option value='projects'>View Team's Projects</option>
                {props.managed_team ? <option value='switchTeam'>Switch Team</option> : null}
                <option value='logout'>Logout</option>
            </select>
            {props.activity === 'projects' ? <div>
                <select className='menu' onChange={(e) => filterProjects(e.target.value)}>
                    <option disabled selected>Filter Projects by</option>
                    <option value='completed'>Completed</option>
                    <option value='in progress'>In Progress</option>
                    <option value='all'>All</option>
                </select>
            </div> : null}
            {props.activity === 'calendar' ? <div>
                <select className='menu' onChange={(e) => filterTasks(e.target.value)}>
                    <option disabled selected>Filter Tasks by Priority</option>
                    <option value='high' className='priority-option'>High Priority</option>
                    <option value='normal' className='priority-option'>Normal Priority</option>
                    <option value='low' className='priority-option'>Low Priority</option>
                    <option value='all'>All Tasks</option>
                </select>
                <select className='menu' onChange={(e) => filterTasks(e.target.value)}>
                    <option disabled selected>Filter Tasks by Project</option>
                    {props.projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                    <option value='all'>All Tasks</option>
                </select>
            </div> : null}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {logged: state.loginReducer.logged_in,
            activity: state.dashboardReducer.activity,
            view: state.dashboardReducer.view,
            managed_team: state.employeeReducer.current_user.managed_team,
            projects: state.dashboardReducer.projects,
            filtered_projects: state.dashboardReducer.filtered_projects,
            tasks: state.dashboardReducer.tasks,
            filtered_tasks: state.dashboardReducer.filtered_tasks}
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value})),
        filterProjects: ((filtered) => dispatch({type: 'filtered_projects', payload: filtered})),
        filterTasks: ((filtered) => dispatch({type: 'filtered_tasks', payload: filtered})),
        logged_in: ((bool) => dispatch({type: "logged_in", payload: bool})),
        change_view: ((value) => dispatch({type: "change_view", payload: value})),
        user_logout: () => dispatch({type: 'USER_LOGOUT'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberNav)
