import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";

const Login = props => {
    let history = useHistory();
   const login = (e) => {
        e.preventDefault()
        let configObj = {method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                          email: props.email,
                          password: props.password
                        })}
        fetch(props.baseUrl + '/login', configObj)
        .then(res => res.json())
        .then(employee => {
            localStorage.token = employee.token
            history.push("/dashboard");
        })
    }
    
    return(
        <Form onSubmit={(e) => login(e)}>
            <h1>Welcome to Takser!</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={props.email} onChange={(e) => props.new_email_value(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={props.password} onChange={(e) => props.new_password_value(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {email: state.loginReducer.email, 
            password: state.loginReducer.password, 
            baseUrl: state.urlReducer.baseUrl}
}

const mapDispatchToProps = (dispatch) => {
    console.log(dispatch)
    return{
        new_email_value:((value) => dispatch({type: 'new_email_value', payload: value})),
        new_password_value:((value) => dispatch({type: 'new_password_value', payload: value}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)