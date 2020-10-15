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
        <div>TEAM's CALENDAR</div>
    )
}

export default TeamCalendar