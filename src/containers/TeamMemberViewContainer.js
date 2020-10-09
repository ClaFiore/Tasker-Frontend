import React from 'react'
import {connect} from 'react-redux'
import './TeamMemberViewCont.css'
import TeamMemberNav from './TeamMemberNav';
import TeamSideBar from './TeamSideBar'
import CalendarComponent from './CalendarComponent'
import ProjectContainer from './ProjectContainer';
import Profile from '../components/Profile'

const TeamMemberViewContainer = props => {

    return(
        <div className='container-div-dashboard'>
            <TeamSideBar />
            <div className='sub-container-div'>
            <TeamMemberNav /> 
            {props.activity === 'calendar' ? <CalendarComponent /> : props.activity === 'projects' ? <ProjectContainer /> : <Profile />}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return state.dashboardReducer
} 

export default connect(mapStateToProps)(TeamMemberViewContainer)