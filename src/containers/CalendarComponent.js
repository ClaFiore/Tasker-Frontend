import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import {connect} from 'react-redux'
import './TeamMemberViewCont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './calendar.css'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {markingTaskStatus} from '../actions'

const CalendarComponent = props => {

    const [show, setShow] = useState(false)
    const [taskId, setTaskId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [taskContent, setTaskContent] = useState('')
    const [taskProject, setTaskProject] = useState('')
    const [taskStart, setTaskStart] = useState('')
    const [taskEnd, setTaskEnd] = useState('')
    const [taskStatus, setTaskStatus] = useState('')
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const formatEvents = () => {
        return props.filtered_tasks.map(task => {
                  const {id, title, start, end, content, status, project_id} = task
                  let startTime = new Date(start)
                  let endTime = new Date(end)
                    if (status === 'in progress'){
                  return {
                    title, 
                    id,
                    start: startTime,
                    end: endTime,
                    content: content,
                    borderColor: '#ffcc00', //overrides dot-coloring for background color, the border color is visible in day/week-view
                    backgroundColor: '#ffcc00', // visible in week-view/day-view and as dot in month-view
                    //textColor: 'black', //this changes color font in week-view/day-view
                    extendedProps: {content, id, project_id}
                  }
                }else if (status === 'completed')
                    return {
                    id,
                    title, 
                    start: startTime,
                    end: endTime,
                    content: content,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    extendedProps: {content, id, project_id}
                }
        })
      }
    
    const displayEvent = (e) => {
        let current_task = props.tasks.find(t => t.id === e.event._def.extendedProps.id)
        setTaskId(current_task.id)
        setTaskStatus(current_task.status)
        setTaskTitle(current_task.title)
        setTaskContent(current_task.content)
        
        let project = props.projects.filter(p => p.id === current_task.project_id)
        let t = project[0].title
        setTaskProject(t)
        console.log(current_task.start)
        let taskStartDate = new Date(e.event._instance.range.start)
        let startTime = taskStartDate.toUTCString().split('G')[0]
        let taskEndDate = new Date(e.event._instance.range.end)
        let endTime = taskEndDate.toUTCString().split('G')[0]
        setTaskStart(startTime)
        setTaskEnd(endTime)

        handleShow()
    }

    const markTaskAsComplete = () => {
        let id = taskId
        let configObj = {
            method: 'PATCH',
            headers: {Authorization: `Bearer ${localStorage.token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({status: 'completed'})
        }
        props.markingTaskStatus(id, configObj)
        handleClose()
    }

    const markTaskAsInProgress = () => {
        let id = taskId
        let current_task = props.tasks.find(t => t.id === id)
        let configObj = {
            method: 'PATCH',
            headers: {Authorization: `Bearer ${localStorage.token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({status: 'in progress'})
        }
        props.markingTaskStatus(id, configObj)
        handleClose()
    }
    
    const dropEvent = (e) => {
        let current_task = props.tasks.find(t => t.id === e.event._def.extendedProps.id)
        let id = current_task.id

        let rangeStart = e.event._instance.range.start
        let dd = String(rangeStart.getDate()).padStart(2, '0')
        let mm = String(rangeStart.getMonth() + 1).padStart(2, '0')
        let yyyy = rangeStart.getFullYear()
        
        let hours = rangeStart.getHours() + 4
        let americanFormat = 'AM'
            if (hours > 12){
                hours = hours - 12
                americanFormat = 'PM'
            }
        let minutes = String(rangeStart.getMinutes())

        let newStart = mm + '-' + dd + '-' + yyyy + ' ' + hours + ':' + minutes + ' ' + americanFormat
        
        
        //END
        let rangeEnd = e.event._instance.range.end
        let dd_end = String(rangeEnd.getDate()).padStart(2, '0')
        let mm_end = String(rangeEnd.getMonth() + 1).padStart(2, '0')
        let yyyy_end = rangeEnd.getFullYear()
        
        let hours_end = rangeEnd.getHours() + 4
        let americanFormat_end = 'AM'
            if (hours_end > 12){
                hours_end = hours_end - 12
                americanFormat_end = 'PM'
            }
        let minutes_end = String(rangeEnd.getMinutes())

        let newEnd = mm_end + '-' + dd_end + '-' + yyyy_end + ' ' + hours_end + ':' + minutes_end + ' ' + americanFormat_end
        

        let configObj = {
            method: 'PATCH',
            headers: {Authorization: `Bearer ${localStorage.token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({  start: newStart, 
                                    end: newEnd,
                                    title: current_task.title,
                                    content: current_task.content,
                                    status: current_task.status,
                                    team_member_id: current_task.team_member_id,
                                    priority: current_task.priority,
                                    project_id: current_task.project_id
                                })
        }

        props.markingTaskStatus(id, configObj)

    }

    return(
        <div className='calendar-div-container'>
            <FullCalendar 
                    timeZone= 'UTC'
                    initialView='dayGridMonth'
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{
                        left: 'today,prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
                      }}
                    editable={true}
                    weekends= {true}
                    eventClick={(e) => displayEvent(e)}
                    dateClick = {(e) => console.log(e)}
                    eventDrop={(e) => dropEvent(e)}
                    events={formatEvents()}
                />
               <div>
               <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{taskTitle}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        {taskContent}
                    </Modal.Body>
                    <Modal.Body>
                        <span className='display-task-modal-span'>Start: </span> <span>{taskStart}</span> <br></br>
                        <span className='display-task-modal-span'>End: </span>{taskEnd}
                    </Modal.Body>
                    <Modal.Body>
                        <span className='display-task-modal-span'>Project: </span>{taskProject}
                    </Modal.Body>
                <Modal.Footer>
                        {taskStatus === 'in progress' ? <button className='btn-circle-green' onClick={() => markTaskAsComplete()}>&#10004;</button> : <button className='btn-circle-yellow' onClick={() => markTaskAsInProgress()}>&#x270d;</button>}
                        <Button size='sm' variant="secondary" onClick={handleClose}>
                        Back
                        </Button>
                    </Modal.Footer>
                </Modal>
               </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        projects: state.dashboardReducer.projects,
        tasks: state.dashboardReducer.tasks,
        filtered_tasks: state.dashboardReducer.filtered_tasks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value})),
        markingTaskStatus: (id, configObj) => {dispatch(markingTaskStatus(id, configObj))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)