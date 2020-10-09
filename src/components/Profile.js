import React from 'react'
import {connect} from 'react-redux'

const Profile = props => {
    console.log(props)
    return(
        <div>
            Hello {props.employee.employee.first_name}!
        </div>
    )
}

const mapStateToProps = state => {
    return {
        employee: state.employeeReducer.current_user
    }
}



export default connect(mapStateToProps)(Profile)