import React from 'react'
import { useEffect } from 'react'
import {connect} from 'react-redux'
import {fetchingProjects} from '../actions'
import ProjectCard from '../components/ProjectCard'

const ProjectContainer = props => {

useEffect(()=>{
    props.fetchingProjects(props.team_id)
}, [])

    return(
        <div>
            {props.projects.map(project => <ProjectCard project={project} key={project.id}/>)}
        </div>
    )
}

const mapStateToProps = state => {
    return {team_id: state.employeeReducer.current_user.employee.team_id,
            projects: state.dashboardReducer.projects}
}

const mapDispatchToProps = dispatch => {
    return{
        fetchingProjects: (teamID) => {dispatch(fetchingProjects(teamID))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectContainer)