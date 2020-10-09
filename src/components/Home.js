// import { useHistory } from "react-router-dom";
import React from 'react'
// import Login from "./Login";
import './home.css'

const Home = props => {
    const login = () => {
        props.history.push('/login')
    }

    return(
        <div className='home-div'>
            <h1>WELCOME TO TASKER</h1>
            <button onClick={() => login()}>Login</button>
        </div>
    )
}

export default Home