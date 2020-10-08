import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import TeamMemberNav from './TeamMemberNav';
import TeamSideBar from './TeamSideBar'

const TeamMemberViewContainer = props => {

    useEffect(() => {
        let configObj = {method: 'GET', 
                        headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
                        }
        fetch(props.baseUrl + 'employees/employee', configObj)
        .then(res => res.json())
        .then(employee => props.add_current_user(employee))
    },[])


    return(
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <div className='settings-div'>
                <img className='settings-img' src={''} /></div>
            </Navbar>

            {/* <Calendar /> */}
            <TeamSideBar />
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {baseUrl: state.urlReducer.baseUrl, current_user: state.employeeReducer.current_user}
}

const mapDispatchToProps = (dispatch) => {
    console.log(dispatch)
    return{
       add_current_user:((employee)=> dispatch({type: 'add_current_user', payload: employee}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberViewContainer)