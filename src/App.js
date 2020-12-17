import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import Training from './components/Training';
import TrainingCalendar from './components/TrainingCalendar'


import NavBar from './sidebar/NavBar'

import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function App() {
  const BrowserRouter = require("react-router-dom").BrowserRouter;

  const Route = require("react-router-dom").Route;
  
  const Link = require("react-router-dom").Link;

  const Switch = require("react-router-dom").Switch;


  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={CustomerList} />
          <Route path='/training' component={Training} />
          <Route path='/calendar' component={TrainingCalendar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
