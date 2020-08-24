import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { blue } from '@material-ui/core/colors';
import { UserContext } from '../components/userContext';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { open } = props;
  const userContext = React.useContext(UserContext);

  function handleClickLogout() {
    userContext.isAuthenticated = false;
  }

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <List>
        <ListItem button component={Link} to="/" onClick={handleClickLogout}>
        <ListItemAvatar>
            <Avatar className={classes.avatar}>
                <ExitToAppIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Logout' />
        </ListItem>        
      </List>
    </Dialog>
  );
}