import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {connect} from 'react-redux'
import {updatingProject} from '../actions'


const EditProject = (props) => {
    
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = React.useState(props.project.title)
    const [content, setContent] = React.useState(props.project.content)
    const [due_by, setDueBy] = React.useState(props.project.due_by)
    
    const updateProject = (e) => {
      e.preventDefault()
      let configObj = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
        body: JSON.stringify({
          title, 
          content,
          due_by
        })
      }
      let projectId = props.project.id
      props.updatingProject(configObj, projectId)
      handleClose()
    }
    
    return (
      <>
        <Button size='sm' variant="outline-primary" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {props.project.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => updateProject(e)}>
                    <Form.Group >
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control name="due_by" value={due_by} onChange={(e) => setDueBy(e.target.value)}/>
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

  const mapDispatchToProps = dispatch => {
    return{
        updatingProject: (configObj, projectId) => {dispatch(updatingProject(configObj, projectId))}
    }
}

export default connect (null, mapDispatchToProps)(EditProject)