import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const ProjectDetails = (props) => {
    
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let due_by_date = props.project.due_by.split('T')[0]
    
    return (
      <>
        <h4 id='project-card-title' onClick={handleShow}>
          {props.project.title}
        </h4>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title style={{color: '#0A2659'}}>{props.project.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.project.content}</Modal.Body>
          <Modal.Body>Status: {props.project.status}</Modal.Body>
            <Modal.Body>Due by: {due_by_date}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ProjectDetails