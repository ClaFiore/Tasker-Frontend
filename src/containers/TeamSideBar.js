import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import './TeamMemberViewCont.css'


const TeamSideBar = props => {
console.log(props)


    return(
        <div className='sidebar-div'>
            <div className='image-div'>
                <img className='photo-img' src={props.current_user.employee.photo}/>
            </div>
            <div className='profile-info'>
                <h3>{props.current_user.employee === 'loading' ? 'loading' : props.current_user.employee.first_name}</h3>
                <h4>{props.current_user.employee === 'loading' ? 'loading' : props.current_user.employee.last_name}</h4>
                <h5>{props.current_user.employee === 'loading' ? 'loading' : props.current_user.employee.title}</h5>
                <h5>{props.current_user.employee === 'loading' ? 'loading' : props.current_user.employee.department}</h5>
                <h5>{props.current_user.employee === 'loading' ? 'loading' : props.current_user.team.name}</h5>
                {/* <p>{props.current_user.team.name}</p> */}
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {current_user: state.employeeReducer.current_user}
}

const mapDispatchToProps = (dispatch) => {
    
    return{
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSideBar)