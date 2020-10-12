import React from 'react'
import {connect} from 'react-redux'
import { useEffect } from 'react'
import {fetchingProjects} from '../actions'
import TeamMemberViewContainer from './TeamMemberViewContainer'
import ManagerViewContainer from './ManagerViewContainer'
import { fetchingEmployee } from '../actions'

const Dashboard = props => {


    useEffect(()=>{
        if (props.view === 'team member')
        props.fetchingProjects(props.team_id)
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
        view: state.dashboardReducer.view}
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchingProjects: (teamID) => {dispatch(fetchingProjects(teamID))}
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)