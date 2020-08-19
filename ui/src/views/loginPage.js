// Core React
import React from 'react';

// external libraries
import {Redirect} from 'react-router-dom';
import * as firebase from "firebase/app";
import 'firebase/auth';

// mui hooks
import { makeStyles } from '@material-ui/core/styles';

// MUI Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import { useSnackbar } from 'notistack';

// MUI Icons
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

// mui icons
// hooks

// components
import { UserContext } from '../components/userContext';

// services
// errors
// utils
// configuration
// icons
// assets
// styles

const useStyles = makeStyles((theme) => ({

  root: {
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(70,132,243,1)',
    height: '100%',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1),
    height: '400px',
    width: '400px',
    justifyContent: 'center',
  },
  submit: {
    color: theme.palette.background.paper,
    backgroundColor: 'rgba(70,132,243,1)',
    width: '10%',
    margin: theme.spacing(2),
  },
  textfield: {
    width: '70%',
    padding: theme.spacing(2),
  }
}));

export default function Login() {

  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const userContext = React.useContext(UserContext);
  const [disable, setDisable] = React.useState(false);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  const enqueueSnackbar = useSnackbar();

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  
  async function handleClickLogin(event) {
    event.preventDefault();
    setDisable(true);
    if(email === '')
      handleSnackbarEmail('error');

    if(password === '')
      handleSnackbarPassword('error');
    const firebaseUser = await firebase.auth().signInWithEmailAndPassword(email, password);
    userContext.updateAuthentication(firebaseUser.user.uid);
    setDisable(false);
  }

function handleSnackbarEmail(variant) {
  enqueueSnackbar('Please enter your email');
}
function handleSnackbarPassword(variant) {
  enqueueSnackbar('Please enter password');
}
  
  return (
    <React.Fragment>
        <div className={classes.root}>
          <form className={classes.form} onSubmit={handleClickLogin}>
            <h3>Sign In</h3>
            <TextField
              className={classes.textfield}
              onChange={handleEmail}
              value={email}
              id="email"
              placeholder="email address"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small"/>
                  </InputAdornment>
                ),
            }}
            />
            <TextField
              className={classes.textfield}
              onChange={handlePassword}
              type="password"
              placeholder="password"
              id="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
            }}
            />
            <Button
              type='submit'
              className={classes.submit}
              disabled={disable}
            >
              LOGIN
            </Button>
          </form>
          {
            userContext.isAuthenticated && <Redirect to="/dashboard" />
          } 
        </div>
    </React.Fragment>
  );
}