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
import QuestionEditor from './QuestionEditor';

// services
// errors
// utils
// configuration
import configuration from '../../configuration/configuration';
import { UserContext } from '../../components/userContext';

// icons
// assets
// styles
const useStyles = makeStyles(() => ({
    actionButton: {
        color: 'rgba(70,132,243,1)'
    },
    card: {
        height: '280px',
        width: '480px',
        margin: '50px'
    },
    cardsDisplay: {
        display: 'flex',
        flexWrap: 'wrap'
    } 
}))

export default function QuestionsAsked() {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [ closeEditor, setCloseEditor ] = React.useState(false);
    const [ openDisplayQuestion, setOpenDisplayQuestion ] = React.useState(false);
    const [ questions, setQuestions ] = React.useState([]);
    const [ questionToBeEdited, setQuestionToBeEdited ] = React.useState({});
    const [ openEditor, setOpenEditor ] = React.useState(false);
    const [ questionToBeDisplayed, setQuestionToBeDisplayed ] = React.useState({});

    React.useEffect(() => {
        fetch(configuration.routes.users + 'questionsAsked/' + 1, {
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

    function handleClickDelete(question) {
        return() => {
            fetch(configuration.routes.questions, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: question.id,
                    userId: '1'
                })
            })
                .then(response => response.json())
                .then(result => {
                    if(!result.error) {
                        enqueueSnackbar('Question deleted successfully');
                    } else {
                        enqueueSnackbar('An error occured. Please try again.');
                    }
                }).catch(e => enqueueSnackbar('An error occured. Please try again.'))
        }
    }

    function handleClickEdit(question) {
        return() => {
        setQuestionToBeEdited(question);
        setOpenEditor(true);
        }
    }

    return(
        <div>
            {(!openDisplayQuestion && !closeEditor && !openEditor) && <React.Fragment>
                <ActionBar
                    pageTitle={"Questions Asked"}
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
                <div className={classes.cardsDisplay}>
                    {questions.map(question => (
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography>Question - {question.description}</Typography>
                                <Typography>Student name - {question.name}</Typography>
                                <Typography>Upvotes - {question.upvotes}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={handleClickMore(question)} size="small" style={{ color: 'rgba(70,132,243,1)' }}>Learn More</Button>
                                <Button onClick={handleClickEdit(question)} size="small" style={{ color: 'rgba(70,132,243,1)' }}>Edit</Button>
                                <Button onClick={handleClickDelete(question)} size="small" style={{ color: 'rgba(70,132,243,1)' }}>Delete</Button>
                            </CardActions>
                        </Card>
                    ))} 
                </div>
            </React.Fragment>}
            {openDisplayQuestion && <DisplayQuestion question={questionToBeDisplayed} />}
            {closeEditor && <Dashboard />}
            {openEditor && <QuestionEditor questionToBeEdited={questionToBeEdited} />}
        </div>
    );
}