import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {connect} from 'react-redux'

const ProjectCard = props => {
    const {title, content, status} = props.project
    return(
        <div>
            <div>
            <Card style={{ width: '18rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                    Project status: {status}
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                </Card.Body>
            </Card>
            </div>
            
        </div>
    )
}


// const mapStateToProps = state => {
//     return {project: state.dashboardReducer.projects}
// }

export default ProjectCard