import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux'
import Modal from 'react-bootstrap/Modal';


const CreateTask = (props) => {

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
            <Modal.Title>Create New Project <br></br>
            Team: </Modal.Title>
          </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e)=>createNewProject(e)}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control name="content" placeholder="Enter content" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control name="due_by" placeholder="Enter due date" />
                        <Form.Text className="text-muted">
                            Please insert date as yyyy-mm-dd
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Project
                    </Button>
                </Form>
                
          </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Back
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        managed_team: state.employeeReducer.current_user.managed_team
        }
}

const mapDispatchToProps = dispatch => {
    return{
        addingNewProject: (configObj) => {dispatch(addingNewProject(configObj))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)