import React from 'react';
import { BrowserRouter, Route, Switch, withRouter, Redirect } from "react-router-dom";
import './App.css';
import Login from './components/Login'
import Dashboard from './containers/Dashboard'
import Home from './components/Home'


function App() {
  return (
    <div>
    <BrowserRouter>
    <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
    </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App

        
