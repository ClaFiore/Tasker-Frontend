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

const TeamCalendar = props => {

    const [show, setShow] = useState(false)
    const [taskMember, setTaskMember] = useState('')
    const [currentTask, setCurrentTask] = useState('')
    const [currentTaskProject, setCurrentTaskProject] = useState('')
    const [taskId, setTaskId] = useState('')
    
    const [taskDate, setTaskDate] = useState('')
    const [americanFormatStart, setAmericanFormatStart] = useState('')
    const [americanFormatEnd, setAmericanFormatEnd] = useState('')
    const [taskStartHH, setTaskStartHH] = useState('')
    const [taskStartMM, setTaskStartMM] = useState('')
    const [taskEndHH, setTaskEndHH] = useState('')
    const [taskEndMM, setTaskEndMM] = useState('')
    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const formatEvents = () => {

        let arrays = props.managed_members.map(member => member.tasks)
        let tasks = []
        arrays.map(array => {tasks = [...tasks, ...array]})
     
            return tasks.map(task => {
                
                  const {id, title, start, end, content, status, project_id, team_member_id, team_member} = task
                  let startTime = new Date(start)
                  let endTime = new Date(end)
                  
                        return {
                            title, 
                            id,
                            start: startTime,
                            end: endTime,
                            content: content,
                            borderColor: task.team_member.color,
                            backgroundColor: task.team_member.color,
                            //textColor: 'black', 
                            extendedProps: {content, id, project_id, team_member_id, status}
                        }
            })
    }

    const displayEvent = e => {
        let current_member = props.managed_members.find(member => member.id === e.event._def.extendedProps.team_member_id)
        setTaskMember(current_member)
        let current_task = current_member.tasks.find(t => t.id === e.event._def.extendedProps.id)
        let current_project = current_task.project
        setCurrentTaskProject(current_project)
        setCurrentTask(current_task)
        setTaskId(current_task.id)
       
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

    return(
        <div className='calendar-div-manager'>
             <FullCalendar 
                    timeZone= 'UTC'
                    slotDuration='00:15'
                    initialView='list'
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{
                        left: 'today,prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
                      }}
                    editable={false}
                    weekends= {true}
                    eventClick={(e) => displayEvent(e)}
                    dateClick = {null}
                    eventDrop={null}
                    eventResize={null}
                    events={formatEvents()}
            />
            <div>
                <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                    <span className='edit-task-input-title'>{currentTask.title}</span> 
                 </Modal.Header>
                     <Modal.Body>
                        <span className='display-task-modal-span'>Notes: </span> <span className='edit-task-input'>{currentTask.content}</span> <br></br>
                        <span className='display-task-modal-span'>Date: </span> <span className='edit-task-input'>{taskDate}</span> <br></br>
                         <span className='display-task-modal-span'>From: </span> <span className='edit-task-time'>{taskStartHH}</span><span>:</span>
                         <span className='edit-task-time'>{taskStartMM}</span><span className='edit-task-american-format'>{americanFormatStart}</span> <br></br>
                         <span className='display-task-modal-span'>To: </span><span className='edit-task-time' >{taskEndHH}</span><span>:</span>
                        <span className='edit-task-time'>{taskEndMM}</span><span className='edit-task-american-format'>{americanFormatEnd}</span> <br></br>
                         <span className='display-task-modal-span'>Project: </span>{currentTaskProject.title}
                     </Modal.Body>
                    <Modal.Header>
                        <p><span className='display-task-modal-span'>Employee: </span><span className='employee-task-modal-manager' style={{color: `${taskMember.color}`}}>{taskMember.first_name} {taskMember.last_name}</span></p>
                    </Modal.Header>
                 </Modal>
                </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        managed_members: state.employeeReducer.managed_members,
    }
}

 const mapDispatchToProps = (dispatch) => {
    return{
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value})),
        markingTaskStatus: (id, configObj) => {dispatch(markingTaskStatus(id, configObj))},
        deletingTask: (id, configObj) => {dispatch(deletingTask(id, configObj))}
    }
}


 export default connect(mapStateToProps, mapDispatchToProps)(TeamCalendar)