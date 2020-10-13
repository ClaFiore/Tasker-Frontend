import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import {connect} from 'react-redux'
import './TeamMemberViewCont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import "@fullcalendar/core/main.css";  
// import "@fullcalendar/daygrid/main.css";

const CalendarComponent = props => {

    const formatEvents = () => {
        return props.projects.map(project => {
                  const {title, due_by, content} = project
      
                //   let startTime = new Date(start)
                  let endTime = new Date(due_by)
      
                  return {
                    title, 
                    start: endTime,
                   //end: endTime
                    extendedProps: {...content}
                  }
              })
      }

    
    return(
        <div className='calendar-div-container'>
            <FullCalendar 
                    initialView='dayGridMonth'
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{
                        left: 'today,prev,next',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
                      }}
                    editable={true}
                    weekends= {true}
                    // eventDrop={this.handleEventDrop}
                    eventClick={null}
                    events={formatEvents()}
                />
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        projects: state.dashboardReducer.projects,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)