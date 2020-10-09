import React from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import { creatingToken } from '../actions'
import { browserHistory } from 'react-router'

// const URL = 'http://localhost:3000/api/v1/'

const Login = props => {
    // const [email, changeEmail] = useState("")
    // const [password, changePassword] = useState("")
    
    const login = (e) => {
        e.preventDefault()
        let configObj = {method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            email: e.target.email.value,
                            password: e.target.password.value
                        })}
        fetch("http://localhost:3000/api/v1/login", configObj)
        .then(res => res.json())
        .then(employeeInfo => {
            if (employeeInfo.error){
                alert(employeeInfo.error)}
            else{
            localStorage.token = employeeInfo.token 
            props.logged_in(true)
            goToDashboard()
        }
        })
    }
    
    const goToDashboard = () => {
            props.history.push('/dashboard')
        }
    

    
    return(
        <Form onSubmit={(e) => login(e)}>
            <h1>Welcome to Takser!</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email'/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password'/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
    
}


const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        logged_in: ((bool) => dispatch({type: "logged_in", payload: bool})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)