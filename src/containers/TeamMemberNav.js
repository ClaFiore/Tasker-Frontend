import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import {gettingManagedMembers} from '../actions'
import {fetchingProjects, readingNotification} from '../actions'
import './TeamMemberViewCont.css'
import Badge from 'react-bootstrap/Badge'
import Dropdown from 'react-bootstrap/Dropdown'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

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
            case 'team_calendar':
                props.changeActivity(value)
                break
            case 'my_team':
                props.changeActivity(value)
                break
            case 'switchTeam':
                if (props.view === 'team member')
                {props.change_view('manager')
                props.changeActivity('team_calendar')
                props.gettingManagedMembers(props.managed_team.id)
                props.fetchingProjects(props.managed_team_id)
                }
                else
                {props.change_view('team member')
                props.fetchingProjects(props.team_id)
                props.changeActivity('calendar')}
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


    const handleNotifications = e => {
        let notification_id = e
        let configObj = {method: 'PATCH',
        headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
        body: JSON.stringify({read: true})
        }
        props.readingNotification(notification_id, configObj)
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a href="" ref={ref} onClick={e => {
            e.preventDefault()
            onClick(e)}}>
                <i className="fas fa-bell fa-2x"></i>
                <Badge pill variant="danger">{props.unread_notifications.length > 0 ? props.unread_notifications.length : null}</Badge>
        </a>
      ))
      

    return(
        <div className={props.view === 'team member' ? 'navbarT' : 'navManager'} >
            <Navbar>
        
            
            
            {props.activity === 'projects' ? <div>
                <NavDropdown title="Filter Projects By" className='menu' onSelect={(e) => filterProjects(e)}>
                    <NavDropdown.Item eventKey='completed'>Completed</NavDropdown.Item>
                    <NavDropdown.Item eventKey='in progress'>In Progress</NavDropdown.Item>
                    <NavDropdown.Item eventKey='all'>All</NavDropdown.Item>
                </NavDropdown>
            </div> : null}
         
            
            {props.activity === 'calendar' ? 
            <Nav.Item>
                <NavDropdown title="Filter Tasks by Priority" className='menu' onSelect={(e) => filterTasks(e)}>
                    <NavDropdown.Item eventKey='high' className='priority-option'>High Priority</NavDropdown.Item>
                    <NavDropdown.Item eventKey='normal' className='priority-option'>Normal Priority</NavDropdown.Item>
                    <NavDropdown.Item eventKey='low' className='priority-option'>Low Priority</NavDropdown.Item>
                    <NavDropdown.Item eventKey='all'>All Tasks</NavDropdown.Item>
                </NavDropdown>
            </Nav.Item>
             : null}    

            {props.activity === 'calendar' ? 
                <Nav.Item>
                <NavDropdown title="Filter Tasks by Project" className='menu' onSelect={(e) => filterTasks(e)}>
                    {props.projects.map(p => <NavDropdown.Item key={p.id} eventKey={p.id}>{p.title}</NavDropdown.Item>)}
                    <NavDropdown.Item eventKey='all'>All Tasks</NavDropdown.Item>
                </NavDropdown>
                </Nav.Item>
            : null}   

            <NavDropdown title="Menu" id="nav-dropdown" className='menu' onSelect={(e) => handleMenu(e)}>
                {props.view === 'manager' ? <NavDropdown.Item eventKey='team_calendar'>Team's Calendar</NavDropdown.Item> : null}
                {props.view === 'team member' ? <NavDropdown.Item eventKey='calendar'>My Calendar</NavDropdown.Item> : null}
                {props.view === 'team member' ? <NavDropdown.Item eventKey='profile'>My Profile</NavDropdown.Item> : null}
                {props.view === 'team member' ? <NavDropdown.Item eventKey='my_team'>My Team</NavDropdown.Item> : null}
                <NavDropdown.Item eventKey='projects'>Team's Projects</NavDropdown.Item>
                {props.managed_team ? <NavDropdown.Item eventKey='switchTeam'>Switch Team</NavDropdown.Item> : null}
                <NavDropdown.Item eventKey='logout'>Logout</NavDropdown.Item>
            </NavDropdown>

            
                <Dropdown drop="left" onSelect={(e) => handleNotifications(e)}>
                <div className = "notification">
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
 
                {props.notifications.length > 0 ? 
                <Dropdown.Menu >
                    {props.notifications.map(notif => 
                        <div key={notif.id} className='dropdownNotifications'>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey={notif.id} >
                                <div className={notif.read === false ? 'unReadNotif' : 'readNotif'}>
                                    <span style={{fontWeight: 'bold'}}>{notif.header}</span>
                                    <p className='notifMessage'>{notif.message}</p>
                                    <span className='timestamp'>{notif.time}</span>
                                </div>
                            </Dropdown.Item>
                        </div>)}
                </Dropdown.Menu> 

                : null} 
                </div>
                </Dropdown>

                
            
           
        </Navbar>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {logged: state.loginReducer.logged_in,
            team_id: state.employeeReducer.current_user.employee.team_id,
            activity: state.dashboardReducer.activity,
            view: state.dashboardReducer.view,
            managed_team: state.employeeReducer.current_user.managed_team,
            projects: state.dashboardReducer.projects,
            filtered_projects: state.dashboardReducer.filtered_projects,
            tasks: state.dashboardReducer.tasks,
            filtered_tasks: state.dashboardReducer.filtered_tasks,
            managed_members: state.employeeReducer.managed_members,
            managed_team_id: state.employeeReducer.current_user.employee.managed_team_id,
            notifications: state.dashboardReducer.notifications,
            unread_notifications: state.dashboardReducer.unread_notifications
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value})),
        filterProjects: ((filtered) => dispatch({type: 'filtered_projects', payload: filtered})),
        filterTasks: ((filtered) => dispatch({type: 'filtered_tasks', payload: filtered})),
        logged_in: ((bool) => dispatch({type: "logged_in", payload: bool})),
        change_view: ((value) => dispatch({type: "change_view", payload: value})),
        user_logout: () => dispatch({type: 'USER_LOGOUT'}),
        gettingManagedMembers: (managed_team_id) => {dispatch(gettingManagedMembers(managed_team_id))},
        fetchingProjects: (teamID) => {dispatch(fetchingProjects(teamID))},
        readingNotification: (notification_id, configObj) => {dispatch(readingNotification(notification_id, configObj))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberNav)
