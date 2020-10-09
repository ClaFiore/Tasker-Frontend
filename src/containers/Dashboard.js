import React from 'react'
import {connect} from 'react-redux'
// import { useState, useEffect } from 'react';
import TeamMemberViewContainer from './TeamMemberViewContainer'
import ManagerViewContainer from './ManagerViewContainer'
import { fetchingEmployee } from '../actions'

const Dashboard = props => {

    // useEffect(() => {
    //     props.fetchingEmployee()
    // },[])

    return(
        <div>
        {props.view === 'team_member' ? <TeamMemberViewContainer /> : <ManagerViewContainer />}
        </div>
    )
}



const mapStateToProps = (state) => {
    return state.dashboardReducer
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchingEmployee: () => { dispatch( fetchingEmployee() )}
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)