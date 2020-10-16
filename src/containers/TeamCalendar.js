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

    const formatEvents = () => {

        let randomColor
        let arrays = props.managed_members.map(member => member.tasks)
        let tasks = []
        arrays.map(array => {
            randomColor = Math.floor(Math.random()*16777215).toString(16);
            tasks = [...tasks, ...array]})
     
            return tasks.map(task => {
                
                
                  const {id, title, start, end, content, status, project_id, team_member_id} = task
                  let startTime = new Date(start)
                  let endTime = new Date(end)
                  
                    if (status === 'in progress'){
                        return {
                            title, 
                            id,
                            start: startTime,
                            end: endTime,
                            content: content,
                            borderColor: '#'+randomColor,
                            backgroundColor: '#'+randomColor,
                            //textColor: 'black', 
                            extendedProps: {content, id, project_id, team_member_id, status}
                        }
                    }else{
                        return {
                            id,
                            title, 
                            start: startTime,
                            end: endTime,
                            content: content,
                            backgroundColor: '#'+randomColor,
                            borderColor: '#'+randomColor,
                            extendedProps: {content, id, project_id, team_member_id, status}
                        }
                    }
            })
        
    }



    return(
        <div className='calendar-div-manager'>
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
                    editable={false}
                    weekends= {true}
                    eventClick={null}
                    dateClick = {null}
                    eventDrop={null}
                    eventResize={null}
                    events={formatEvents()}
            />
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