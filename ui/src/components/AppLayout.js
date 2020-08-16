// react
import React from 'react';

// ext libs
import { Link } from "react-router-dom";

// mui hooks
import { makeStyles } from '@material-ui/core/styles';

// mui components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { ListItem, ListItemText } from '@material-ui/core';

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

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#FFFFFF'
    },
    logo: {
        height: 50,
        width: 100,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#00008B'
    },
    drawerContainer: {
        overflow: 'auto',
        color: theme.palette.background.paper,
    },
    content: {
        flexGrow: 1,
        marginTop: '45px',
        marginLeft: '30px',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    contentNestedList: {
        marginLeft: '40px',
        flexGrow: 1,
        '&:hover': {
            backgroundColor: '',
        },
        '&active': {
            backgroundColor: '',
        },
    },
    navBar: {
        listStyle: 'none',
        display: 'flex',
        margin: '10px 100px'
    },
    navBarElements: {
        display: 'block',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '14px 16px',
        textDecoration: 'none',
        fontSize: '18px'
    }  
}));
export default function AppLayout({children}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <img src='#'  alt="logo" className={classes.logo} />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItemText className={classes.content}>TAGS</ListItemText>
                        <List>                            
                            <ListItem button component={Link} to="/">
                                <ListItemText className={classes.contentNestedList} primary="Java" />
                            </ListItem> 
                            <ListItem button component={Link} to="/theme-view">
                                <ListItemText className={classes.contentNestedList} primary="Javascript" />
                            </ListItem>                            
                        </List>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                <div>{children}</div>
            </main>
        </div>
    );
}
