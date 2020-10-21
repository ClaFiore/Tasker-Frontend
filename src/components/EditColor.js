import React from 'react'
import {useState} from 'react'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './profile.css'
import {updatingUser} from '../actions'
import { CirclePicker } from 'react-color'


const EditColor = props => {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [color, setColor] = useState('')
    
    const pickColor = (e) => {
        setColor(e.hex)
    }

    const updateUserColor = () => {
        handleClose()
        let id = props.employee.id
        let employee = {color}
        props.updatingUser(employee, id)
    }

    return(
        <div>
            <Button size='sm' variant="primary" onClick={handleShow}>
                Edit Color
            </Button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Pick Your Favorite Color</Modal.Title></Modal.Header>
            <Modal.Body>
                <CirclePicker onChangeComplete={pickColor} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => updateUserColor()}>
                    Pick
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employee: state.employeeReducer.current_user.employee
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updatingUser: ((employee, token) => dispatch(updatingUser(employee, token))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditColor)
