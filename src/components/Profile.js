import React from 'react'
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import EditColor from './EditColor'
import './profile.css'
import EditProfile from './EditProfile'


const Profile = props => {
    
    return(
        <div className='profile-container-div'>
            <h3 style={{color: props.employee.color}}>Hello {props.employee.first_name}!</h3>
            <br></br>
            <p><span className='elenco'>Name: </span><span>{props.employee.first_name}</span></p>
            <p><span className='elenco'>Last Name: </span><span>{props.employee.last_name}</span></p>
            <p><span className='elenco'>Title: </span><span>{props.employee.title}</span></p>
            <p><span className='elenco'>Department: </span><span>{props.employee.department}</span></p>
            <p><span className='elenco'>Member of: </span><span>{props.team.name}</span></p>
            {props.managed_team ? <p><span className='elenco'>Manager of: </span><span> {props.managed_team.name} </span></p> : null}
            <p><span className='elenco'>Phone Number: </span><span>{props.employee.phone}</span></p>
            <p><span className='elenco'>Email Address: </span><span>{props.employee.email}</span></p>
            <p><span className='elenco'>Home Address: </span><span>{props.employee.address}</span></p>
            <p><span className='elenco'>Date of Birth: </span><span>{props.employee.dob}</span></p>
            <br></br>
            <EditProfile />
            <br></br>
            <EditColor />
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
