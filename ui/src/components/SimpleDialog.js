import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { open } = props;

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <List>
        <ListItem button component={Link} to="/questions-liked">
        <ListItemAvatar>
            <Avatar className={classes.avatar}>
                <FavoriteBorderIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Saved Questions' />
        </ListItem>

        <ListItem button component={Link} to="/answers-liked">
        <ListItemAvatar>
            <Avatar className={classes.avatar}>
                <FavoriteBorderIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Saved Answers' />
        </ListItem>
        <ListItem button component={Link} to="/questions-asked">
        <ListItemAvatar>
            <Avatar className={classes.avatar}>
                <QuestionAnswerIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Questions Asked' />
        </ListItem>
        <ListItem button component={Link} to="/questions-answered">
        <ListItemAvatar>
            <Avatar className={classes.avatar}>
                <QuestionAnswerIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Questions Answered' />
        </ListItem>
        <ListItem button component={Link} to="/">
        <ListItemAvatar>
            <Avatar className={classes.avatar}>
                <ExitToAppIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Logout' />
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
        <ListItemAvatar>
            <Avatar className={classes.avatar}>
                <HighlightOffIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Close' />
        </ListItem>
      </List>
    </Dialog>
  );
}