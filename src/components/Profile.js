import React from 'react'
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import EditColor from './EditColor'
import './profile.css'
import EditProfile from './EditProfile'


const Profile = props => {
    
    return(
        <div className='profile-container-div'>
            <div className='profileItem'>
            <h3 style={{color: props.employee.color}}>Hello {props.employee.first_name}!</h3>
            <br></br>
            <p><span className='elencoMember'>Name: </span><span>{props.employee.first_name}</span></p>
            <p><span className='elencoMember'>Last Name: </span><span>{props.employee.last_name}</span></p>
            <p><span className='elencoMember'>Title: </span><span>{props.employee.title}</span></p>
            <p><span className='elencoMember'>Department: </span><span>{props.employee.department}</span></p>
            <p><span className='elencoMember'>Member of: </span><span>{props.team.name}</span></p>
            {props.managed_team ? <p><span className='elencoMember'>Manager of: </span><span> {props.managed_team.name} </span></p> : null}
            <p><span className='elencoMember'>Phone Number: </span><span>{props.employee.phone}</span></p>
            <p><span className='elencoMember'>Email Address: </span><span>{props.employee.email}</span></p>
            <p><span className='elencoMember'>Home Address: </span><span>{props.employee.address}</span></p>
            <p><span className='elencoMember'>Date of Birth: </span><span>{props.employee.dob}</span></p>
            <br></br>
            <EditProfile />
            <br></br>
            <EditColor />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employee: state.employeeReducer.current_user.employee,
        team: state.employeeReducer.current_user.team,
        managed_team: state.employeeReducer.current_user.managed_team,
        token: state.loginReducer.token
    }
}

export default connect(mapStateToProps)(Profile)
