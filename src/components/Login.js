import React from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './login.css'



const Login = props => {
   
    
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
            props.add_current_user(employeeInfo)
            localStorage.token = employeeInfo.token
            localStorage.team_id = employeeInfo.employee.team_id 
            props.logged_in(true)
            props.add_token(employeeInfo.token)
        }
        })
    }
    
   

    if (props.logged){
        return(
            <Redirect to='/' />
        )
    }
    
    return(
        <div className='login-div'>
            <div className='login-content'>
                <div className='loginForm'>
                <Form style={{width: '100%'}} onSubmit={(e) => login(e)}>
                    <h1 className='please-login'>PLEASE LOG IN</h1>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email'/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password'/>
                    </Form.Group>
                    <br></br>
                    <button className='loginSubmitBtn' type="submit">
                        Submit
                    </button>
                </Form>
                </div>
            </div>
        </div>
    )
    
}


const mapStateToProps = (state) => {
    return {logged: state.loginReducer.logged_in}
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_current_user: ((employeeInfo) => dispatch({type: 'add_current_user', payload: employeeInfo})),
        logged_in: ((bool) => dispatch({type: "logged_in", payload: bool})),
        add_token: ((tok) => dispatch({type: "add_token", payload: tok}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)