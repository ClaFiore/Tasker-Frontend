// import { useHistory } from "react-router-dom";
import React from 'react'
import {Redirect} from 'react-router-dom'
import './home.css'
import Dashboard from '../containers/Dashboard'

const Home = props => {
    const login = () => {
        props.history.push('/login')
    }

    return(
        <div className='home-div'>
            {localStorage.token ? <Redirect to='/dashboard'/> : <div> <h1>WELCOME TO TASKER</h1><button onClick={() => login()}>Login</button> </div>}
        </div>
    )
}

export default Home