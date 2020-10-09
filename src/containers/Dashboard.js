import React from 'react'
import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import TeamMemberViewContainer from './TeamMemberViewContainer'
import ManagerViewContainer from './ManagerViewContainer'
import { fetchingEmployee } from '../actions'

const Dashboard = props => {
    useEffect(() => {
        let configObj = {method: 'GET', 
                        headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
                        }
       props.fetchingEmployee(configObj)
    },[])

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
        fetchingEmployee: (configObj) => { dispatch( fetchingEmployee(configObj) )}
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)