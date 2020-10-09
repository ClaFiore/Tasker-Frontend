import React from 'react'
import {connect} from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import './TeamMemberViewCont.css'


const TeamSideBar = props => {

    return(
        <div className='sidebar-div'>
            <div className='image-div'>
                {/* <img className='photo-img' src={props.current_user.employee.photo}/> */}
            </div>
            <div className='profile-info'>
                <h3>{props.current_user.employee.first_name}</h3>
                <h4>{props.current_user.employee.last_name}</h4>
                <h5>{props.current_user.employee.title}</h5>
                <h5>{props.current_user.employee.department}</h5>
                <h5>{props.current_user.team.name}</h5>
            </div>
            {/* <select onChange={(e) => props.changeActivity(e.target.value)}>
                <option selected disabled>Team Projects</option>
                <option value='projects'>View All Projects</option>
            </select> */}
        </div>

    )
}

const mapStateToProps = (state) => {
    return state.employeeReducer
}

const mapDispatchToProps = (dispatch) => {
    return{
        changeActivity: ((value) => dispatch({type: 'changeActivity', payload: value}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSideBar)