import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import TeamMemberViewContainer from './TeamMemberViewContainer'
import ManagerViewContainer from './ManagerViewContainer'

const Dashboard = props => {
    console.log(props)
    return(
        <div>
        {props.view === 'team_member' ? <TeamMemberViewContainer /> : <ManagerViewContainer />}
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {view: state.dashboardReducer.view}
}

const mapDispatchToProps = (dispatch) => {
    console.log(dispatch)
    return{
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)