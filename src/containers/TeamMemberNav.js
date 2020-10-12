import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
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
        </div>
    )
}


const mapStateToProps = (state) => {
    return {logged: state.loginReducer.logged_in,
            activity: state.dashboardReducer.activity,
            view: state.dashboardReducer.view,
            managed_team: state.employeeReducer.current_user.managed_team,
            projects: state.dashboardReducer.projects,
            filtered_projects: state.dashboardReducer.filtered_projects}
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value})),
        filterProjects: ((filtered) => dispatch({type: 'filtered_projects', payload: filtered})),
        logged_in: ((bool) => dispatch({type: "logged_in", payload: bool})),
        change_view: ((value) => dispatch({type: "change_view", payload: value})),
        user_logout: () => dispatch({type: 'USER_LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberNav)
