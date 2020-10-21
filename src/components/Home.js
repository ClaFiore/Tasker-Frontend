// import { useHistory } from "react-router-dom";
import React from 'react'
import {Redirect} from 'react-router-dom'
import './home.css'
import Dashboard from '../containers/Dashboard'
import Button from 'react-bootstrap/Button';

const Home = props => {
    const login = () => {
        props.history.push('/login')
    }

    return(
        <div className='home-div'>
            <div>
            {localStorage.token ? <Redirect to='/dashboard'/> : <div className='home-content'> <img className='homeLogo' src={require('../images/taskerHome.png')}/><button className='login-btn' onClick={() => login()}>Login</button> </div>}
        </div>
        </div>
    )
}

export default Home