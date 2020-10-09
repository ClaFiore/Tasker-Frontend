import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import './TeamMemberViewCont.css'

const TeamMemberNav = props => {


    const handleMenu = (value) => {
        switch(value){
            case 'logout':
            localStorage.clear()
            props.logged_in(false)
            props.user_logout()
            break
            case 'projects':
                props.changeActivity(value)
            break
            case 'calendar':
                props.changeActivity(value)
            break
            case 'profile':
                props.changeActivity(value)
            break
        }
        
    }

    if (!props.logged){
        return(
            <Redirect to='/' />
        )
    }

    return(
        <div className='navbar'>
                            <select className='menu' onChange={(e) => handleMenu(e.target.value)}>
                                <option selected disabled>Menu</option>
                                <option value='profile'>View My Profile</option>
                                <option value='calendar'>View My Calendar</option>
                                <option value='projects'>View Team's Projects</option>
                                {props.managed_team ? <option value='switch'>Switch Team</option> : null}
                                <option value='logout'>Logout</option>
                            </select>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {logged: state.loginReducer.logged_in,
            managed_team: state.employeeReducer.current_user.managed_team}
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value})),
        logged_in: ((bool) => dispatch({type: "logged_in", payload: bool})),
        user_logout: () => dispatch({type: 'USER_LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberNav)
