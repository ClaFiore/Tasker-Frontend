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
import {assigningTask} from '../actions'



const AssignTask = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const submitForm = (e) => {
        e.preventDefault()

        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0')
        let mm = String(today.getMonth() + 1).padStart(2, '0') 
        let yyyy = today.getFullYear()
        let hh = today.getHours()
        let min = String(today.getMinutes())
        let americanFormat = 'AM'

            if (hh > 12){
                hh = hh - 12
                americanFormat = 'PM'
            }

        let hour = String(hh)

            if (hour.split('').length === 1 ){
                hour = '0' + hour
            }
            if (min.split('').length === 1){
                min = '0' + min
            }
        let todayStart = mm + '-' + dd + '-' + yyyy + ' ' + hour + ':' + min + ' ' + americanFormat
        
        
        let todayPlusOneHour = new Date(today.getTime() + 30 * 60000)
        console.log(todayPlusOneHour)
        let dd_end = String(todayPlusOneHour.getDate()).padStart(2, '0')
        let mm_end = String(todayPlusOneHour.getMonth() + 1).padStart(2, '0') 
        let yyyy_end = todayPlusOneHour.getFullYear()
        let hh_end = todayPlusOneHour.getHours()
        let min_end = String(todayPlusOneHour.getMinutes())
        let americanFormat_end = 'AM'

            if (hh_end > 12){
                hh_end = hh_end - 12
                americanFormat_end = 'PM'
            }

        let hour_end = String(hh_end)

            if (hour_end.split('').length === 1 ){
                hour_end = '0' + hour_end
            }
            if (min_end.split('').length === 1){
                min_end = '0' + min_end
            }

        let todayEnd = mm_end + '-' + dd_end + '-' + yyyy_end + ' ' + hour_end + ':' + min_end + ' ' + americanFormat_end


        let configObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
            body: JSON.stringify({
                title: e.target.title.value,
                message: e.target.message.value,
                team_member_id: e.target.member_id.value,
                project_id: e.target.project_id.value,
                priority: e.target.priority.value,
                start: todayStart,
                end: todayEnd,
                status: 'in progress',
                content: e.target.content.value,
                team_leader_id: props.current_user.employee.id
            })
        }
        props.assigningTask(configObj)
        handleClose()
    }

    return(
        <div>
            <Button size='sm' variant="light" onClick={handleShow}>
                Assign Task 
            </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton><Modal.Title>Assign Task</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => submitForm(e)}>
                    <Form.Row>
                        <Col>
                            <select id='dropdown-create-task' name='member_id' >
                                <option>Team Member</option>
                                {props.managed_members.map(member => <option key={member.id} value={member.id} >{member.first_name} {member.last_name}</option>)}
                            </select>
                        </Col>
                        <Col>
                            <select id='dropdown-create-task' name='project_id'>
                                <option>Project</option>
                                {props.projects.map(project => <option key={project.id} value={project.id}>{project.title}</option>)}
                            </select>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" placeholder="Enter title" />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Label>Content</Form.Label>
                            <Form.Control name="content" placeholder="Enter content" />
                        </Col>
                    </Form.Row>
                    <br></br>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check inline name='priority' type="radio" label="High Priority" value='high'/>
                        <Form.Check inline name='priority' type="radio" label="Normal Priority" value='normal'/>
                        <Form.Check inline name='priority' type="radio" label="Low Priority" value='low'/>
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Label>Message</Form.Label>
                            <Form.Control name="message" placeholder="Enter content" />
                        </Col>
                    </Form.Row>
                    <br></br>
                    <Button size='sm' variant="success" type="submit">
                            Assign Task
                    </Button>
                </Form>   
            </Modal.Body>
        </Modal>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        team: state.employeeReducer.current_user.team,
        projects: state.dashboardReducer.projects,
        current_user: state.employeeReducer.current_user,
        managed_members: state.employeeReducer.managed_members
        }
}
const mapDispatchToProps = (dispatch) => {
    return{
        assigningTask: (configObj) => {dispatch(assigningTask(configObj))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AssignTask)























{/* <br></br>
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
                    </Form.Row> */}