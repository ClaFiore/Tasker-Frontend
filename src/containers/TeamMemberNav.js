import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import './TeamMemberNav.css'

const TeamMemberNav = props => {
    console.log(props)
    return(
        <div className='navbar'>
             NAVBAR
            <div className='settings'>
                <img src={''}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return state
}

const mapDispatchToProps = (dispatch) => {
    console.log(dispatch)
    return{
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberNav)