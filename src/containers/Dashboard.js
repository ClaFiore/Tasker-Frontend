import React from 'react'
import {connect} from 'react-redux'
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import TeamMemberViewContainer from './TeamMemberViewContainer'
import ManagerViewContainer from './ManagerViewContainer'

const Dashboard = props => {

    // useEffect(() => {

    //     let configObj = {method: 'GET', 
    //                     headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
    //                     }
    //     debugger
    //     fetch(props.baseUrl + 'employees/employee', configObj)
    //     .then(res => res.json())
    //     .then(employee => props.add_current_user(employee))
    // },[])

    return(
        <div>
        {props.view === 'team_member' ? <TeamMemberViewContainer /> : <ManagerViewContainer />}
        </div>
    )
}

const mapStateToProps = (state) => {
 
    return {view: state.dashboardReducer.view, baseUrl: state.urlReducer.baseUrl, current_user: state.employeeReducer.current_user}
}

const mapDispatchToProps = (dispatch) => {

    return{
        add_current_user:((employee)=> dispatch({type: 'add_current_user', payload: employee}))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)