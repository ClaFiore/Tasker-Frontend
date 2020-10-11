import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



const EditProject = (props) => {
    
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    return (
      <>
        <Button size='sm' variant="outline-primary" onClick={handleShow}>
          Edit Project
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {props.project.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control name="content" placeholder="Enter content" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Project
                    </Button>
                </Form>
                
          </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Back
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default EditProject