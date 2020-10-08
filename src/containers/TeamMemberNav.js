import React from 'react'
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom";
import './TeamMemberViewCont.css'

const TeamMemberNav = props => {
console.log(props)

    const handleMenu = (value) => {
        switch(value){
            case 'logout':
            localStorage.clear()
            // props.history.push("/login")
            break
        }
        
    }
    return(
        <div className='navbar'>
                            <select className='menu' onChange={(e) => handleMenu(e.target.value)}>
                                <option selected disabled>Menu</option>
                                <option value='profile'>View My Profile</option>
                                <option value='switch'>Switch Team</option>
                                <option value='logout'>Logout</option>
                            </select>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
 return dispatch
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberNav)