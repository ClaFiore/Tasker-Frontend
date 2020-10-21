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
            <button className='editProfBtn' onClick={handleShow}>
                Edit Color
            </button>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Pick Your Favorite Color</Modal.Title></Modal.Header>
            <Modal.Body style={{paddingLeft: '25%'}}>
                <CirclePicker onChangeComplete={pickColor} />
            </Modal.Body>
            <Modal.Footer>
                <button className='editProfBtn' onClick={() => updateUserColor()}>
                    Pick
                </button>
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
