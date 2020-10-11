import React from 'react'
import {connect} from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import './TeamMemberViewCont.css'


const TeamSideBar = props => {

    return(
        <div className='sidebar-div'>
                <div className='manager-team-member-view-div'>
                    <h4>{props.view.toUpperCase()}</h4>
                    {props.view === 'manager' ? 
                        <p>'{props.managed_team.name}'</p>
                        :
                        <p>'{props.team.name}'</p>
                    }
                </div>
            <div className='profile-info'>
                <h4>{props.employee.first_name}</h4>
                <p>{props.employee.last_name}</p>
                <p>{props.employee.title}</p>
                <p>Department: {props.employee.department}</p>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        employee: state.employeeReducer.current_user.employee,
        team: state.employeeReducer.current_user.team,
        view: state.dashboardReducer.view,
        managed_team: state.employeeReducer.current_user.managed_team
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSideBar)