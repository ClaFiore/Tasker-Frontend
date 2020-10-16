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
                    events={null}
            />
        </div>
    )
}

export default TeamCalendar