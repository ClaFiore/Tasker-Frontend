import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";



const Logout = (props) => {

    if (!props.logged){
        return(
            <Redirect to='/' />
        )
    }

    const loggingOut = () => {
        localStorage.clear()
        props.logged_in(false)
        props.user_logout()
    }

    return(
        <button onClick = {() => loggingOut()}>Logout</button>
    )
}



const mapStateToProps = (state) => {
    return {logged: state.loginReducer.logged_in,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logged_in: ((bool) => dispatch({type: "logged_in", payload: bool})),
        user_logout: () => dispatch({type: 'USER_LOGOUT'})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Logout)