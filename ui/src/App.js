// core react
import React from 'react';
import * as firebase from "firebase/app";

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

firebase.initializeApp(firebaseConfig);

function App() {
    return(
      <React.Fragment>
        <CssBaseline />
            <Router>
                <Switch>
                  <PrivateRoute path="/" exact component={Demo} />                      
                </Switch>
            </Router>
      </React.Fragment>
    );
}

export default App;

