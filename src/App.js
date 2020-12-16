import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import Training from './components/Training';
import TrainingCalendar from './components/TrainingCalendar'
import Header from "./Header";
import { makeStyles } from '@material-ui/core/styles';

import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function App() {
  const BrowserRouter = require("react-router-dom").BrowserRouter;

  const Route = require("react-router-dom").Route;
  
  const Link = require("react-router-dom").Link;

  const Switch = require("react-router-dom").Switch;

const useStyles = makeStyles ({})
const classes = useStyles();
  return (
    <div className="App">
    <Header />
    <BrowserRouter>
      <div>
      <Link to="/">Customer</Link>
      <Link to="/training">Training</Link>
      <Link to="/calendar">TrainingCalendar</Link>
      <Switch>
        <Route exact path = "/" component = {CustomerList} />
        <Route  path = "/training" component = {Training} />
      <Route path="/calendar" component = {TrainingCalendar} />
      </Switch>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
