import { useHistory } from "react-router-dom";
import React, {useState, useEffect} from 'react'
import Login from "./Login";

const Home = props => {
    const login = () => {
        props.history.push('/login')
    }

    return(
        <div>
            WELCOME TO TASKER
            <button onClick={() => login()}>Login</button>
        </div>
    )
}

export default Home