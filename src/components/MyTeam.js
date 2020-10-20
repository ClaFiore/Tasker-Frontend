import React, {useState} from 'react'
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


const MyTeam = props => {
    return(
        <div className='my_team_container_div'>
        <div>MY TEAM</div>
        </div>
    )
}

export default MyTeam