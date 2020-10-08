import React from 'react'
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
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

const mapStateToProps = (state) => {
    return {current_user: state.employeeReducer.current_user}
}

const mapDispatchToProps = (dispatch) => {
    return{
       add_current_user:((employee)=> dispatch({type: 'add_current_user', payload: employee}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberViewContainer)