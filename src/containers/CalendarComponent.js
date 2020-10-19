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
import {deletingTask} from '../actions'

const CalendarComponent = props => {

    const [show, setShow] = useState(false)
    const [taskId, setTaskId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [taskContent, setTaskContent] = useState('')
    const [taskProject, setTaskProject] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [americanFormatStart, setAmericanFormatStart] = useState('')
    const [americanFormatEnd, setAmericanFormatEnd] = useState('')
    const [taskStartHH, setTaskStartHH] = useState('')
    const [taskStartMM, setTaskStartMM] = useState('')
    const [taskEndHH, setTaskEndHH] = useState('')
    const [taskEndMM, setTaskEndMM] = useState('')
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
                    }else 
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
        let americanFormat_start
        let date = current_task.start.split('T')[0]
        let start_hh = current_task.start.split('T')[1].split(':')[0]
        let int_s = parseInt(start_hh)
            if (int_s > 12){
                int_s = int_s - 12
                americanFormat_start = 'PM'
            }else{
                americanFormat_start = 'AM'
            }
        let time_start_string = String(int_s)
            if (time_start_string.split('').length === 1){
                time_start_string = '0' + time_start_string
            }
        let start_mm = current_task.start.split('T')[1].split(':')[1]
            if (start_mm.split('').length === 1){
                start_mm = '0' + start_mm
            }
            
        let end_hh = current_task.end.split('T')[1].split(':')[0]
        let end_mm = current_task.end.split('T')[1].split(':')[1]
            if (end_mm.split('').length === 1){
                end_mm = '0' + end_mm
            }
        let americanFormat_end
        let int_e = parseInt(end_hh)
            if (int_e > 12){
                int_e = int_e - 12
                americanFormat_end = 'PM'
            }else{
                americanFormat_end = 'AM'
            }
        let time_end_string = String(int_e)
            if (time_end_string.split('').length === 1){
                time_end_string = '0' + time_end_string
            }
            

        setAmericanFormatStart(americanFormat_start)
        setTaskDate(date)
        setTaskStartHH(time_start_string)
        setTaskStartMM(start_mm)
        setTaskEndHH(time_end_string)
        setTaskEndMM(end_mm)
        setAmericanFormatEnd(americanFormat_end)
        handleShow()
    }

    const updateTask = () => {
        let id = taskId
        let current_task = props.tasks.find(t => t.id === id)
        let dd = taskDate.split('-')[2]
        let mm = taskDate.split('-')[1]
        let yyyy = taskDate.split('-')[0]
        let newStart = mm + '-' + dd + '-' + yyyy + ' ' + taskStartHH + ':' + taskStartMM + ' ' + americanFormatStart
        let newEnd = mm + '-' + dd + '-' + yyyy + ' ' + taskEndHH + ':' + taskEndMM + ' ' + americanFormatEnd
        
        let configObj = {
            method: 'PATCH',
            headers: {Authorization: `Bearer ${localStorage.token}`, 'Content-Type': 'application/json', Accept: 'application/json'},
            body: JSON.stringify({  start: newStart, 
                                    end: newEnd,
                                    title: taskTitle,
                                    content: taskContent,
                                    status: current_task.status,
                                    team_member_id: current_task.team_member_id,
                                    priority: current_task.priority,
                                    project_id: current_task.project_id
                                })
        }
        props.markingTaskStatus(id, configObj)
        handleClose()
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

    const deleteTask = () => {
        console.log('deleting')
        let id = taskId
        let configObj = {method: 'DELETE', headers: {Authorization: `Bearer ${localStorage.token}`}}
        props.deletingTask(id, configObj)
        handleClose()
    }

     return(
        <div className='calendar-div-container'>
            <div>
             <FullCalendar 
                    timeZone= 'UTC'
                    slotDuration='00:15'
                    initialView='dayGridMonth'
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{
                        left: 'today,prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
                      }}
                    editable={true}
                    weekends= {false}
                    eventClick={(e) => displayEvent(e)}
                    dateClick = {(e) => console.log(e)}
                    eventDrop={(e) => dropEvent(e)}
                    eventResize={(e)=> dropEvent(e)}
                    events={formatEvents()}
                    eventDisplay='block'
                 />
                <div>
                </div>
                <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                    <input className='edit-task-input-title' value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)}/> 
                 </Modal.Header>
                     <Modal.Body>
                        <span className='display-task-modal-span'>Notes: </span> <span><input className='edit-task-input' value={taskContent} onChange={(e)=>setTaskContent(e.target.value)}/></span> <br></br>
                        <span className='display-task-modal-span'>Date: </span> <span><input className='edit-task-input' value={taskDate} onChange={(e)=>setTaskDate(e.target.value)}/></span> <br></br>
                         <span className='display-task-modal-span'>From: </span> <span><input className='edit-task-time' value={taskStartHH} onChange={(e) => setTaskStartHH(e.target.value)}/></span><span>:</span>
                         <span><input className='edit-task-time' value={taskStartMM} onChange={(e) => setTaskStartMM(e.target.value)}/></span><span><input className='edit-task-american-format' value={americanFormatStart} onChange={(e)=>setAmericanFormatStart(e.target.value)}/></span> <br></br>
                         <span className='display-task-modal-span'>To: </span><span><input className='edit-task-time' value={taskEndHH} onChange={(e) => setTaskEndHH(e.target.value)}/></span><span>:</span>
                        <span><input className='edit-task-time' value={taskEndMM} onChange={(e) => setTaskEndMM(e.target.value)}/></span><span><input className='edit-task-american-format' value={americanFormatEnd} onChange={(e)=>setAmericanFormatEnd(e.target.value)}/></span> <br></br>
                         <span className='display-task-modal-span'>Project: </span>{taskProject}
                     </Modal.Body>
                 <Modal.Footer>
                        <button className='btn-circle-red' onClick={() => deleteTask()}>&#10008;</button>
                         {taskStatus === 'in progress' ? <button className='btn-circle-green' onClick={() => markTaskAsComplete()}>&#10004;</button> : <button className='btn-circle-yellow' onClick={() => markTaskAsInProgress()}>&#x270d;</button>}
                        <Button size='sm' variant="primary" className='edit-btn' onClick={() => updateTask()}>Update</Button>

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
        filtered_tasks: state.dashboardReducer.filtered_tasks
    }
}

 const mapDispatchToProps = (dispatch) => {
    return{
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value})),
        markingTaskStatus: (id, configObj) => {dispatch(markingTaskStatus(id, configObj))},
        deletingTask: (id, configObj) => {dispatch(deletingTask(id, configObj))}
    }
}


 export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)