import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import {connect} from 'react-redux'
import './TeamMemberViewCont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewTask from '../components/ViewTask'
const CalendarComponent = props => {

    const formatEvents = () => {
        return props.filtered_tasks.map(task => {
                  const {title, start, end, content, status} = task
                  let startTime = new Date(start)
                  let endTime = new Date(end)
                    if (status === 'in progress'){
                  return {
                    title, 
                    start: startTime,
                    end: endTime,
                    content: content,
                    borderColor: '#ffcc00', //overrides dot-coloring for background color, the border color is visible in day/week-view
                    backgroundColor: '#ffcc00', // visible in week-view/day-view and as dot in month-view
                    //textColor: 'black', //this changes color font in week-view/day-view
                    extendedProps: {...content}
                  }
                }else if (status === 'completed')
                    return {
                    title, 
                    start: startTime,
                    end: endTime,
                    content: content,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    extendedProps: {...content}
                }
        })
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
                    eventClick={null}
                    events={formatEvents()}
                />
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
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)