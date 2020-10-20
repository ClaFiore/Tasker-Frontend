import React, {useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import './my_team.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {fetchingMyTeam} from '../actions'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'


const MyTeam = props => {

    useEffect(()=>{
        props.fetchingMyTeam(props.team_id, props.current_employee.id)
    }, [])

    let my_peers_tasks = props.peers.map(peer => peer.tasks)
    let tasks = []
    my_peers_tasks.map(array => {tasks = [...tasks, ...array]})
    
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') 
    let yyyy = today.getFullYear()
    let todaysDate = yyyy + '-' + mm + '-' + dd
    
    const taskDate = task => {
        let task_start = new Date(task.start)
        let task_dd = String(task_start.getDate()).padStart(2, '0')
        let task_mm = String(task_start.getMonth() + 1).padStart(2, '0') 
        let task_yyyy = task_start.getFullYear()
        let task_Date = task_yyyy + '-' + task_mm + '-' + task_dd
        return task_Date
    }

    let todaysTasks = tasks.filter(task =>  taskDate(task) === todaysDate)
    todaysTasks.sort((a, b) => b.start.localeCompare(a.start))
    

    return(
        <div className='my_team_container_div'>
            <div>
        <Table striped bordered hover className='table'>
            <thead>
                <tr>
                <th>Team Member</th>
                <th>Start Time</th>
                <th>Task</th>
                <th>About</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Project</th>
                <th>Project Due Date</th>
                </tr>
            </thead>
            <tbody>
            {todaysTasks.map(task => <tr key={task.id} >
                <td style={{fontWeight: 'bold'}}>{task.team_member.first_name} {task.team_member.last_name}</td>
                <td>{task.start.split('T')[1].split('.')[0]}</td>
                <td>{task.title}</td>
                <td>{task.content}</td>
                <td>{task.status === 'in progress' ? <Badge variant="warning">In Progress</Badge> : <Badge variant="success">Completed</Badge> }</td>
                <td>{task.priority}</td>
                <td>{task.project.title}</td>
                <td>{task.project.due_by}</td>
                </tr>)}
            </tbody>
            </Table>
        </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {team_id: state.employeeReducer.current_user.employee.team_id,
        managed_team_id: state.employeeReducer.current_user.employee.managed_team_id,
        projects: state.dashboardReducer.filtered_projects,
        view: state.dashboardReducer.view,
        current_employee: state.employeeReducer.current_user.employee,
        peers: state.employeeReducer.peers
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        fetchingMyTeam: (team_id, user_id) => {dispatch(fetchingMyTeam(team_id, user_id))}
     }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyTeam)