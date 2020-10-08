import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";

const TeamMemberViewContainer = props => {
    return(
        <div>
            TEAM MEMBER VIEW
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberViewContainer)