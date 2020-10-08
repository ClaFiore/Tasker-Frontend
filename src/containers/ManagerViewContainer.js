import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";

const ManagerViewContainer = props => {
    return(
        <div>
            TEAM MANAGER VIEW
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerViewContainer)