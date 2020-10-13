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


const ViewTask = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
            <Button size='sm' variant="outline-primary" onClick={handleShow}>
                Create New Task 
            </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Task</Modal.Title>
          </Modal.Header>
            <Modal.Body>
                some content here
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewTask)