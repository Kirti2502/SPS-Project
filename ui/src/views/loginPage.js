// react
import React from 'react';

// external libs
// mui hooks
import { makeStyles } from '@material-ui/core';
// mui components
// mui icons
// hooks
// components
// services
// errors
// utils
// configuration
// icons
// assets
// styles

const useStyles = makeStyles({
    body: {
        backgroundColor: '#F3EBF6',
        fontFamily: 'sans-serif'
    },
    
    '.main': {
        backgroundColor: '#FFFFFF',
        width: '400px',
        height: '400px',
        margin: '7em',
        borderRadius: '1.5em',
    },

    '.sign': {
        'padding-top': '40px',
        color: '#8C55AA',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: '23px'
    },
    
    '.un' :{
        width: '76%',
        color: 'rgb(38, 50, 56)',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '1px',
        background: 'rgba(136, 126, 126, 0.04)',
        padding: '10px',
        border: 'none',
        borderRadius: '20px',
        outline: 'none',
        boxSizing: 'border-box',
        border: 'rgba(0, 0, 0, 0.02)',
        marginBottom: '50px',
        marginLeft: '46px',
        textAlign: 'center',
        marginBottom: '27px',
        fontFamily: 'sans-serif'
    },

    'form.form1' : {
        paddingTop: '40px'
    },
    
    '.pass': {
        width: '76%',
        color: 'rgb(38, 50, 56)',
        fontWeight: 700,
        fontSize: '14px',
        letterSpacing: '1px',
        background: 'rgba(136, 126, 126, 0.04)',
        padding: '10px',
        border: 'none',
        borderRadius: '20px',
        outline: 'none',
        boxSizing: 'border-box',
        border: 'rgba(0, 0, 0, 0.02)',
        marginBottom: '50px',
        marginLeft: '46px',
        textAlign: 'center',
        marginBottom: '27px',
        fontFamily: 'sans-serif'
    },
    
    
    '.submit': {
        borderRadius: '5em',
        color: '#fff',
        border: 0,
        paddingLeft: '40px',
        paddingRight: '40px',
        paddingBottom: '10px',
        paddingTop: '10px',
        fontFamily: 'sans-serif',
        marginLeft: '35%',
        fontSize: '13px',
        boxShadow: 'rgba(0, 0, 0, 0.04)'
    },
    
    '.forgot': {
        textShadow: 'rgba(117, 117, 117, 0.12)',
        color: '#E1BEE7',
        paddingTop: '15px'
    },
    
    a: {
        textShadow: 'rgba(117, 117, 117, 0.12)',
        color: '#E1BEE7',
        textDecoration: 'none'
    },
    
});

export default function LoginPage(){
    const classes = useStyles();    
    return(
        <div className="main">
            <form class="form1">
                <p class="sign" align="center">Sign in</p>
                <input class="un " type="text" align="center" placeholder="SPS Email"/>
                <input class="pass" type="password" align="center" placeholder="Password"/>
                <a class="submit" align="center">Sign in </a>
                <p class="forgot" align="center"><a href="#">Forgot Password?</a> </p>
            </form>  
        </div>
    );
}