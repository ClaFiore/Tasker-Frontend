import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Dashboard from './containers/Dashboard'


function App() {
  return (
    <BrowserRouter>
        <Route path='/login' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>
    </BrowserRouter>
  );
}

export default App;
