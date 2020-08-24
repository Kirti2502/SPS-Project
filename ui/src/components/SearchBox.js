// Core React
import React from 'react';

// External libraries
// MUI hooks
import { makeStyles } from '@material-ui/core/styles';

// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ActionBar from './ActionBar';

// MUI Icons
// components
import DisplayQuestion from '../views/Dashboard/DisplayQuestion';

// services
// errors
// utils
// configuration
// icons
// assets
// styles
const useStyles = makeStyles(() => ({
    actionIcons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    card: {
        height: '200px',
        width: '300px',
        margin: '50px'
    },
    cardsDisplay: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}))

export default function SearchBox({ questions, handleClickMore }) {
    
    const classes = useStyles();
    const [ questionToDisplay, setQuestionToDisplay ] = React.useState({});
    const [ openDisplayQuestion, setOpenDisplayQuestion ] = React.useState(false);

    function handleClickMore(question) {
        return() => {
            setQuestionToDisplay(question);
            setOpenDisplayQuestion(true);
        }
    }

    return(
        <div>
            {!openDisplayQuestion && <React.Fragment>
            <ActionBar 
                pageTitle='Search'
            />
            <div className={classes.cardsDisplay}>
                {questions.map(question => (
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography>{question.description}</Typography>
                            <Typography>{question.name}</Typography>
                            <Typography>{question.upvotes}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleClickMore(question)} size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
            </React.Fragment>}
            {openDisplayQuestion && <DisplayQuestion question={questionToDisplay}/>}   
        </div>
    );
}