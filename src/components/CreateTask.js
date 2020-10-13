import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import './createTask.css'
import {addingTask} from '../actions'


const CreateTask = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const creatingTask = (e) => {
        e.preventDefault()
        
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy

        let start = today + ' ' + e.target.start.value + ' ' + e.target.time_start.value
        let end = today + ' ' + e.target.end.value + ' ' + e.target.time_end.value

        let configObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
            body: JSON.stringify({
                title: e.target.title.value,
                content: e.target.content.value,
                start: start,
                end: end,
                project_id: e.target.project_id.value,
                team_member_id: props.current_user.employee.id,
                priority: e.target.priority.value,
                status: 'in progress'
            })
        }
        console.log(configObj.body)
        props.addingTask(configObj)
        handleClose()
    }


    return(
        <div>
            <Button size='sm' variant="outline-primary" onClick={handleShow}>
                Create New Task 
            </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
          </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => creatingTask(e)}>
                <Form.Row>
                    <Col>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" placeholder="Enter title" />
                    </Col>
                    <Col>
                        <Form.Label>Content</Form.Label>
                        <Form.Control name="content" placeholder="Enter content" />
                    </Col>
                    </Form.Row>
                    <br></br>
                    <Form.Row>
                        <Form.Label>Start Time</Form.Label>
                    <Col>
                        <Form.Control name="start" placeholder="hh:mm" />
                    </Col>
                    <Col>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check inline name='time_start' type="radio" label="AM" value='AM'/>
                        <Form.Check inline name='time_start' type="radio" label="PM" value='PM'/>
                    </Form.Group>
                    </Col>
                    </Form.Row>
                    <br></br>
                    <Form.Row>
                        <Form.Label>End Time</Form.Label>
                    <Col>
                        <Form.Control name="end" placeholder="hh:mm" />
                    </Col>
                    <Col>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check inline name='time_end' type="radio" label="AM" value='AM'/>
                        <Form.Check inline name='time_end' type="radio" label="PM" value='PM'/>
                    </Form.Group>
                    </Col>
                    </Form.Row>
                    <br></br>
                    <select id='dropdown-create-task' name='project_id'>
                        <option>Project</option>
                        {props.projects.map(project => <option key={project.id} value={project.id}>{project.title}</option>)}
                    </select>
                    <br></br>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check inline name='priority' type="radio" label="High Priority" value='high'/>
                        <Form.Check inline name='priority' type="radio" label="Normal Priority" value='normal'/>
                        <Form.Check inline name='priority' type="radio" label="Low Priority" value='low'/>
                    </Form.Group>

                    <Button size='sm' variant="success" type="submit">
                        Add Task
                    </Button>
                </Form>
                
          </Modal.Body>
            <Modal.Footer>
                <Button size='sm' variant="secondary" onClick={handleClose}>
                Back
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        team: state.employeeReducer.current_user.team,
        projects: state.dashboardReducer.projects,
        current_user: state.employeeReducer.current_user
        }
}

const mapDispatchToProps = dispatch => {
    return{
        addingTask: (configObj) => {dispatch(addingTask(configObj))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)