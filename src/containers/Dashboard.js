import React from 'react'
import {connect} from 'react-redux'
// import { useState, useEffect } from 'react';
import TeamMemberViewContainer from './TeamMemberViewContainer'
import ManagerViewContainer from './ManagerViewContainer'
import { fetchingEmployee } from '../actions'

const Dashboard = props => {

    return(
        <div>
         <TeamMemberViewContainer /> 
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