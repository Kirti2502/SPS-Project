// core react
import React, { Component } from 'react';
import * as firebase from "firebase/app";
import LoginPage from './views/loginPage';
// ext libs
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// mui components
import CssBaseline from '@material-ui/core/CssBaseline';

// views
// components
import Demo from './views/Demo';
import PrivateRoute from './components/PrivateRoute';

// configuration
import { firebaseConfig } from './configuration/configuration';

// serivces
// utils
// assets
// styles
import './App.css';
function App() {
    return(
      <React.Fragment>
        <CssBaseline />
            <Router>
                <Switch>
                  <PrivateRoute path="/" exact component={Demo} />   
                  <Route path="/loginPage" component={ LoginPage } />                   
                </Switch>
            </Router>
      </React.Fragment>
    );
}

export default App;

