// Core React
import React from 'react';

// External libraries
import { useSnackbar } from 'notistack';

// MUI hooks
import { makeStyles } from '@material-ui/core/styles';

// MUI Components
import { Button } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { TextField } from '@material-ui/core';

// MUI Icons
// components
import ActionBar from '../../components/ActionBar';
import QuestionsAsked from './QuestionsAsked';

// services
import configuration from '../../configuration/configuration';
import { UserContext } from '../../components/userContext';

// errors
// utils
// configuration
// icons
// assets
// styles
const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formInput: {
        width: '400px',
        margin: theme.spacing(3),
        minWidth: 120,
    },
    mainContainer: {
        margin: '40px 30px',
    },
    paper: {
        height: '100%',
        width: '1600px',
        display: 'flex',
        justifyContent: 'space-around',
        margin: '40px',
    },
    submitButton: {
        width: '10%',
        margin: '30px',
        color: '#FFFFFF',
        backgroundColor: '#00bcd4',
    },
}));

export default function QuestionEditor({ questionToBeEdited }) {

    const classes = useStyles();
    const [ closeEditor, setCloseEditor ] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [ disableButton, setDisableButton ] = React.useState(false);
    const [ description, setDescription ] = React.useState('');
    const [ question, setQuestion ] = React.useState(questionToBeEdited || {});
    const appContext = UserContext.userId;

    function handleClickSubmit(event) {
        event.preventDefault();

        if(description === '') {
            enqueueSnackbar('Please enter all the fields.');
        } else {
            setDisableButton(true);
            enqueueSnackbar('Saving to the database...');
            fetch(configuration.routes.questions, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: question.id,
                    name: question.name,
                    description: description,
                    tags: question.tags,
                    upvotes: question.upvotes,
                    answers: question.answers,
                    userId: '1',
                })
            })
                .then(response => response.json())
                .then(result => {
                    if(!result.error) {
                        enqueueSnackbar('User updated successfully.');
                        setDisableButton(false);
                    } else {
                        enqueueSnackbar('An error occured while updating question. Please try again.');
                    }
                }) .catch(e => {
                    console.error('Error while updating question-', e);
                    enqueueSnackbar('An error occured while updating question. Please try again.');
                })
        }
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }

    function handleClickCloseEditor() {
        setCloseEditor(true);
    }
    
    return(
        <div className={classes.mainContainer}>
            {!closeEditor && <React.Fragment>
                <ActionBar 
                    pageTitle='Question Editor'
                    actions={[
                        <Button
                            onClick={handleClickCloseEditor}
                            style = {{ color: 'rgba(70,132,243,1)' }}
                        >
                            Close
                        </Button>
                    ]}
                />
                <Paper className={classes.paper}>
                    <form className={classes.form} onSubmit={handleClickSubmit}>
                        <TextField 
                            className={classes.formInput}
                            label='Description'
                            onChange={handleChangeDescription}
                            size='small'
                            value={description}
                        />
                        <Button 
                            className={classes.submitButton} 
                            disabled={disableButton}
                            fullWidth="false" 
                            type="submit"  
                            variant="contained" 
                        >
                            Save
                        </Button>
                    </form>
                </Paper>
            </React.Fragment>}
            {closeEditor && <QuestionsAsked />}
        </div>
    );
}