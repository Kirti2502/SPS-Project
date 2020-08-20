// react
import React from 'react';

// ext libs
import { Link } from "react-router-dom";

// mui hooks
import { makeStyles, ServerStyleSheets } from '@material-ui/core/styles';

// mui components
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// mui icons
// hooks
// components
import { UserContext } from '../components/userContext';
import SimpleDialog from './SimpleDialog';

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
    } ,
    toolbar: {
        color: '#000000',
        display: 'flex',
        justifyContent: 'space-between'
    },
    dialog: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));
export default function AppLayout({children}) {

    const classes = useStyles();
    const appContext = UserContext;
    const [ open, setOpen ] = React.useState(false);

    function handleClickAvatar() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <h3>SPS Doubt Clearing Platform</h3>
                    <Avatar onClick={handleClickAvatar}>{appContext.name}</Avatar>
                    <SimpleDialog open={open} />
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Toolbar />
                <div>{children}</div>
            </main>
        </div>
    );
}
