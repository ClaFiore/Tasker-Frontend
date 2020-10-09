import React from 'react'
import './TeamMemberViewCont.css'
import TeamMemberNav from './TeamMemberNav';
import TeamSideBar from './TeamSideBar'
import CalendarComponent from './CalendarComponent'

const TeamMemberViewContainer = props => {

    return(
        <div className='container-div-dashboard'>
            <TeamSideBar />
            <div className='sub-container-div'>
            <TeamMemberNav /> 
            <CalendarComponent />
            </div>
        </div>
    )
}

export default TeamMemberViewContainer