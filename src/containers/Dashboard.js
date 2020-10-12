import React from 'react'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import {fetchingProjects, fetchingTasks} from '../actions'
import TeamMemberViewContainer from './TeamMemberViewContainer'



const Dashboard = props => {


    useEffect(()=>{
        if (props.view === 'team member'){
        props.fetchingProjects(props.team_id)
        props.fetchingTasks(props.current_employee.employee.id)}
        else
        props.fetchingProjects(props.managed_team_id)
    }, [])


    return(
        <div>
         <TeamMemberViewContainer /> 
        </div>
    )
}



const mapStateToProps = (state) => {
    return {team_id: state.employeeReducer.current_user.employee.team_id,
        managed_team_id: state.employeeReducer.current_user.employee.managed_team_id,
        projects: state.dashboardReducer.filtered_projects,
        view: state.dashboardReducer.view,
        current_employee: state.employeeReducer.current_user}
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchingProjects: (teamID) => {dispatch(fetchingProjects(teamID))},
        fetchingTasks: (current_user_id) => {dispatch(fetchingTasks(current_user_id))}
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)