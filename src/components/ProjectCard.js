import React, { useState} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {connect} from 'react-redux'
import ProjectDetails from './ProjectDetails'

const ProjectCard = props => {
    const {title, content, status, due_by} = props.project
    let due_date = due_by.split('T')[0]
    
    const [modal, setModal] = useState(false)



    return(
        <div>
            <div>
            <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                    Project status: {status}
                    </Card.Text>
                    <Card.Text>
                    Due by: {due_date}
                    </Card.Text>
                    <ProjectDetails project={props.project}/>
                </Card.Body>
            </Card>
            </div>
            
        </div>
    )
}


// const mapStateToProps = state => {
//     return {project: state.dashboardReducer.projects}
// }

// const mapDispatchToProps = dispatch => {
//     changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value})),
// }

export default ProjectCard