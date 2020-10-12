import React, { useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {connect} from 'react-redux'
import ProjectDetails from './ProjectDetails'
import EditProject from './EditProject'
import {updatingProject} from '../actions'
import {deletingProject} from '../actions'

const ProjectCard = props => {
    const {title, content, status, due_by} = props.project
    let due_date = due_by.split('T')[0]
    
    const [modal, setModal] = useState(false)

    const completingProject = () => {
        let configObj = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${localStorage.token}`},
            body: JSON.stringify({status: 'completed'})
          }
        let projectId = props.project.id
        props.updatingProject(configObj, projectId)
    }

    const deletingProject = () => {
        let projectId = props.project.id
        props.deletingProject(projectId)
    }

    return(
        <div>
            <div>
            <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Title><ProjectDetails project={props.project}/></Card.Title>
                    <Card.Text>
                    Project status: {status}
                    </Card.Text>
                    <Card.Text>
                    Due by: {due_date}
                    </Card.Text>
                    {props.view === 'manager' && props.activity === 'projects' && props.project.status === 'in progress' ?
                    <div><EditProject project={props.project}/>
                    <Button onClick={()=> completingProject()} style={{'marginLeft': '10px'}} variant="success" size='sm'>Done</Button>
                    <Button onClick={()=> deletingProject()} style={{'marginLeft': '10px'}} variant="danger" size='sm'> X </Button>
                    </div>
                    :
                    null}
                </Card.Body>
            </Card>
            </div>
            
        </div>
    )
}


const mapStateToProps = state => {
    return {view: state.dashboardReducer.view,
        activity: state.dashboardReducer.activity}
}

const mapDispatchToProps = dispatch => {
    return{
        updatingProject: (configObj, projectId) => {dispatch(updatingProject(configObj, projectId))},
        deletingProject: (projectId) => {dispatch(deletingProject(projectId))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCard)