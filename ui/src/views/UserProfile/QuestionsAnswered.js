// react
import React from 'react';

// external libs
import { useSnackbar } from 'notistack';

// mui hooks
import { makeStyles } from '@material-ui/core/styles';

// mui components
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
// mui icons
// hooks
// components
import ActionBar from '../../components/ActionBar';
import Dashboard from '../Dashboard/Dashboard';
import DisplayQuestion from '../Dashboard/DisplayQuestion';

// services
// errors
// utils
// configuration
import configuration from '../../configuration/configuration';

// icons
// assets
// styles
const useStyles = makeStyles(() => ({
    actionButton: {
        color: 'rgba(70,132,243,1)'
    }
}))
export default function QuestionsAnswered() {

    const classes = useStyles();
    const enqueueSnackbar = useSnackbar();
    const [ closeEditor, setCloseEditor ] = React.useState(false);
    const [ openDisplayQuestion, setOpenDisplayQuestion ] = React.useState(false);
    const [ questions, setQuestions ] = React.useState([]);
    const [ questionToBeDisplayed, setQuestionToBeDisplayed ] = React.useState({});

    React.useEffect(() => {
        fetch(configuration.routes.users + 'questionsAnswered/' + 1, {
            method: 'GET',
            mode: 'cors'
        })
            .then(response => response.json())
            .then(result => {
                if(!result.error) {
                    setQuestions(result.questions);
                } else {
                    enqueueSnackbar('An error occured. Please try again.');
                }
            }) .catch(e => enqueueSnackbar('An error occured. Please try again.'))
    },[]);

    function handleClickMore(question) {
        return() => {
            setOpenDisplayQuestion(true);
            setQuestionToBeDisplayed(question);
        }        
    }

    function handleClickCloseEditor() {
        setCloseEditor(true);
    }

    return(
        <div>
            {(!openDisplayQuestion && !closeEditor) && <React.Fragment>
                <ActionBar
                    pageTitle={"Questions Answered"}
                    actions={[
                    <Button 
                        className={classes.actionButton} 
                        icon="filter"
                        label="closeEditor"  
                        onClick={handleClickCloseEditor}
                    >
                        Close
                    </Button>,
                    ]}
                />
                {questions.map(question => (
                        <Card>
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
            </React.Fragment>}
            {openDisplayQuestion && <DisplayQuestion question={questionToBeDisplayed}/>}
            {closeEditor && <Dashboard />}
        </div>
    );
}