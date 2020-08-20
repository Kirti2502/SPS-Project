// core react
import React, { Component } from 'react';
import * as firebase from "firebase/app";

// ext libs
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// mui components
import CssBaseline from '@material-ui/core/CssBaseline';

// views
// components
import LoginPage from './views/loginPage';
import Dashboard from './views/Dashboard/Dashboard';
import LikedAnswers from './views/UserProfile/LikedAnswers';
import LikedQuestions from './views/UserProfile/LikedQuestions';
import QuestionsAsked from './views/UserProfile/QuestionsAsked';
import QuestionsAnswered from './views/UserProfile/QuestionsAnswered';

// import Demo from './views/Demo';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './components/userContext';

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
          <SnackbarProvider maxSnack={10}>
            <Router>
                <Switch>
                  <UserProvider>
                    <Route path="/" exact component={ LoginPage } />  
                    <PrivateRoute path="/dashboard" exact component={Dashboard} />
                    <PrivateRoute path="/questions-liked" exact component={LikedQuestions} />
                    <PrivateRoute path="/answers-liked" exact component={LikedAnswers} />
                    <PrivateRoute path="/questions-asked" exact component={QuestionsAsked} />
                    <PrivateRoute path="/questions-answered" exact component={QuestionsAnswered} />  
                  </UserProvider>
                </Switch>
            </Router>
          </SnackbarProvider>
      </React.Fragment>
    );
}

export default App;

