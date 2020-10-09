import React from 'react'
import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './profile.css'
import {updatingUser} from '../actions'

const Profile = props => {

    const [first_name, setFirstName] = React.useState(props.employee.first_name)
    const [last_name, setLastName] = React.useState(props.employee.last_name)
    const [address, setAddress] = React.useState(props.employee.address)
    const [phone, setPhone] = React.useState(props.employee.phone)
    const [email, setEmail] = React.useState(props.employee.email)
    const [photo, setPhoto] = React.useState(props.employee.photo)
    
    
    const updateUser = () => {
        let token = props.token
        let employee = { 
            id: props.employee.id,
            first_name,
            last_name,
            address,
            phone,
            email,
            photo
            }
        props.updatingUser(employee, token)
    }
    
    
    return(
        <div className='profile-container-div'>
            Hello {props.employee.first_name}!
            <Form style={{'margin-top': '20px'}} onSubmit={() => updateUser()}>
                <Form.Row>
                    <Col>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control size="sm" value={first_name} onChange={(e) => setFirstName(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control size="sm" value={last_name} onChange={(e) => setLastName(e.target.value)}/>
                    </Col>
                </Form.Row>
                <br></br>
                <Form.Row>
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control size="sm" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control size="sm" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </Col>
                </Form.Row>
                <br></br>
                <Form.Row>
                    <Col>
                        <Form.Label>Photo</Form.Label>
                        <Form.Control size="sm" value={photo} onChange={(e) => setPhone(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.Label>Address</Form.Label>
                        <Form.Control size="sm" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </Col>
                </Form.Row>
                <br></br>
                <Form.Row>
                    <Col>
                        <Form.Label>My Team:</Form.Label>
                        <Form.Control readOnly size="sm" value={props.team.name}/>
                    </Col>
                    <Col>
                        <Form.Label>My Managed Team:</Form.Label>
                        <Form.Control readOnly size="sm" value={props.managed_team ? props.managed_team.name : 'Not a manager'}/>
                    </Col>
                </Form.Row>
                <br></br>
                <Form.Row>
                    <Col>
                        <Form.Label>My Title:</Form.Label>
                        <Form.Control readOnly size="sm" value={props.employee.title}/>
                    </Col>
                    <Col>
                        <Form.Label>My Department:</Form.Label>
                        <Form.Control readOnly size="sm" value={props.employee.department}/>
                    </Col>
                </Form.Row>
                <br></br>
                <Button size="sm" variant="outline-primary" type="submit">
                    Update Information
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employee: state.employeeReducer.current_user.employee,
        team: state.employeeReducer.current_user.team,
        managed_team: state.employeeReducer.current_user.managed_team,
        token: state.employeeReducer.current_user.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updatingUser: ((employee, token) => dispatch(updatingUser(employee, token))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
