import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";

const Login = props => {
let history = useHistory();

console.log(props)
   
const login = (e) => {
        e.preventDefault()
        let configObj = {method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                          email: props.email,
                          password: props.password
                        })}
        fetch(props.baseUrl + 'login', configObj)
            .then(res => res.json())
            .then(employee => {
                    props.add_current_user(employee)
                    console.log(employee)
                    localStorage.setItem('token', employee.token)
                    props.add_current_user(employee)
                    setTimeout(() => goToDashboard(), 50)
                })
    }

const goToDashboard = () => {
    props.history.push("/dashboard")
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

    return {email: state.loginReducer.email, 
            password: state.loginReducer.password, 
            baseUrl: state.urlReducer.baseUrl,
            }
}

const mapDispatchToProps = (dispatch) => {

    return{
        new_email_value:((value) => dispatch({type: 'new_email_value', payload: value})),
        new_password_value:((value) => dispatch({type: 'new_password_value', payload: value})),
        add_current_user:((employee)=> dispatch({type: 'add_current_user', payload: employee}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)