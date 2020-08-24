// core react
import React from 'react';

// mui components 
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import ActionBar from '../../components/ActionBar';
import configuration from '../../configuration/configuration';
import { makeStyles } from '@material-ui/styles';
import { Card } from '@material-ui/core';

import Dashboard from './Dashboard';
 
const useStyles = makeStyles(() => ({
    paper: {
        margin:'50px',
        padding: '20px'
    },
    form: {
        marginBottom: '50px'
    },
    card: {
        marginLeft: '50px',
        marginBottom: '30px',
        height: '200px',
        width: '300px',
    }
}))

export default function DisplayQuestion({ question }) {

    const [ answer, setAnswer ] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [ close, setClose ] = React.useState(false);
    const classes = useStyles();

    function handleChangeAnswer(event) {
        setAnswer(event.target.value);
    }

    function handleSubmitAnswer(event) {
        event.preventDefault();

        fetch(configuration.routes.answers,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Kirti',
                description: answer,
                questionId: question.id,
                userId: '1',
            })
        })
            .then(response => response.json())
            .then(result => {
                if(!result.error) {
                    enqueueSnackbar('Answer added successfully.');
                } else {
                    enqueueSnackbar('An error occured while adding answer. Please try again.');
                }
            }) .catch(e => {
                console.error('Error while adding answer-', e);
                enqueueSnackbar('An error occured while adding answer. Please try again.');
            })
    }

    function handleClickLikeQuestion() {
        fetch(configuration.routes.questions + 'upvote',{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                questionId: question.id,
                userId: '1',
            })
        })
            .then(response => response.json())
            .then(result => {
                if(!result.error) {
                    enqueueSnackbar('Question upvoted successfully.');
                } else {
                    enqueueSnackbar('An error occured while upvoting question. Please try again.');
                }
            }) .catch(e => {
                console.error('Error while upvoting question-', e);
                enqueueSnackbar('An error occured while upvoting question. Please try again.');
            })
    }

    function handleClickLikeAnswer(answer) {
        return() => {
            fetch(configuration.routes.answers + 'upvote',{
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    questionId: question.id,
                    userId: '1',
                    answerId: answer.id
                })
            })
                .then(response => response.json())
                .then(result => {
                    if(!result.error) {
                        enqueueSnackbar('Answer upvoted successfully.');
                    } else {
                        enqueueSnackbar('An error occured while upvoting answer. Please try again.');
                    }
                }) .catch(e => {
                    console.error('Error while upvoting answer-', e);
                    enqueueSnackbar('An error occured while upvoting answer. Please try again.');
                })
        }
    }

    function handleClickClose() {
        setClose(true);
    }

    return(
        <div>
            {!close && <React.Fragment>
                <ActionBar 
                    pageTitle='Question'
                    actions={[
                        <div>
                            <Button onClick={handleClickClose} style = {{ color: 'rgba(70,132,243,1)' }}>Close</Button>
                        </div>
                    ]}
                />
                <Paper className={classes.paper}>
                    <p style={{ backgroundColor: 'rgba(70,132,243,0.5)', padding: '10px' }}>Question - {question.description}</p>
                    <p>Student Name - {question.name}</p>
                    <p>Upvotes - {question.upvotes}</p>
                    <Button onClick={handleClickLikeQuestion} style={{ color: 'rgba(70,132,243,1)' }}>Like</Button>
                    <form onSubmit={handleSubmitAnswer} className={classes.form}>
                        <TextField 
                            label='Add Answer'
                            onChange={handleChangeAnswer}
                            className={classes.form}
                            required
                        />
                        <Button type='submit' style={{ color: 'rgba(70,132,243,1)' }}>submit</Button>
                    </form>
                    <p>Answers</p>
                    {question.answers.map(answer => (
                        <Card className={classes.card}>
                            <p style={{ paddingLeft: '20px' }}>{answer.description}</p>
                            <p style={{ paddingLeft: '20px' }}>Student name - {answer.name}</p>
                            <p style={{ paddingLeft: '20px' }}>Upvotes - {answer.upvotes}</p>
                            <Button onClick={handleClickLikeAnswer(answer)} style={{ paddingLeft: '20px', color: 'rgba(70,132,243,1)' }}>Like</Button>
                        </Card>
                    ))}
                </Paper>
            </React.Fragment>}
            {close && <Dashboard />}
        </div>
    );
}