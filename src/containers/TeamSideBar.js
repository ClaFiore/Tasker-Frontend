import React from 'react'
import {connect} from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import './TeamMemberViewCont.css'
import CreateTask from '../components/CreateTask'
import AddProject from '../components/AddProject'
import AssignTask from '../components/AssignTask'

const TeamSideBar = props => {

    return(
        <div className={props.view === 'team member' ? 'sidebar-div' : 'sideBarManager'}>
                <div className={props.view === 'team member' ? 'manager-team-member-view-div' : 'managerView-div'}>
                    <h4>{props.view.toUpperCase()}</h4>
                    {props.view === 'manager' ? 
                        <p>'{props.managed_team.name}'</p>
                        :
                        <p>'{props.team.name}'</p>
                    }
                </div>
            <div className={props.view ==='team member' ? 'profile-info' : 'profileInfoManager'}>
                <h4>{props.employee.first_name}</h4>
                <p>{props.employee.last_name}</p>
                <p>{props.employee.title}</p>
                <p>Department: {props.employee.department}</p>
            </div>
            {props.activity === 'calendar' && props.view === 'team member' ? <div className='create-project-btn'> <CreateTask /> </div> : null}
            {props.activity === 'team_calendar' && props.view === 'manager' ? <div className='create-project-btn'> <AssignTask /> </div> : null}
            {props.view === 'manager' && props.activity === 'projects' ?
                <div className='create-project-btn'>
                <AddProject/>
                </div>
                :
                null}
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        employee: state.employeeReducer.current_user.employee,
        team: state.employeeReducer.current_user.team,
        view: state.dashboardReducer.view,
        managed_team: state.employeeReducer.current_user.managed_team,
        activity: state.dashboardReducer.activity
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSideBar)