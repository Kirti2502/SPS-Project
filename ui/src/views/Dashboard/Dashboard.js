// react
import React from 'react';

// ext libs
import { useSnackbar } from 'notistack';

// mui hooks
import { makeStyles } from '@material-ui/core/styles';

// mui components
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';

// mui icons
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

// hooks
// components
import ActionBar from '../../components/ActionBar';
import DisplayQuestion from './DisplayQuestion';
import SearchBox from '../../components/SearchBox';
import AddQuestion from './AddQuestion';

// services
// errors
// utils
// configuration
import configuration from '../../configuration/configuration';

// icons
// assets
// styles
const useStyles = makeStyles(() => ({
    actionButtons: {
        width: '500px',
        display: 'flex',
        justifyContent: 'space-between'
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

export default function Dashboard() {

    const enqueueSnackbar = useSnackbar();
    const classes = useStyles();
    const [ questions, setQuestions] = React.useState([]);
    const [ openDisplayQuestion, setOpenDisplayQuestion ] = React.useState(false);
    const [ openEditor, setOpenEditor ] = React.useState(false);
    const [ search, setSearch ] = React.useState(false);
    const [ searchField, setSearchField ] = React.useState('');
    const [ searchedQuestion, setSearchedQuestion ] = React.useState([]);
    const [ questionToDisplay, setQuestionToDisplay ] = React.useState({});

    React.useEffect(() => {
        fetch(configuration.routes.questions, {
            method: 'GET',
            mode: 'cors'
        })
            .then(response => response.json())
            .then(result => {
                if(!result.error) {
                    setQuestions(result.questions);
                } else {
                    enqueueSnackbar('Error loading questions. Please try again.');
                }
            }) .catch(e => enqueueSnackbar('Error loading questions. Please try again.'));
    },[]);

    function handleChangeSearchField(event) {
        if(event.key === 'Enter') {
            const field = event.target.value;
            setSearchField(field);
            setSearch(true);
            fetch(configuration.routes.questions + field)
                .then(response => response.json())
                .then(result => {
                    if(!result.error) {
                        setSearchedQuestion(result.questions);
                    } else {
                        enqueueSnackbar('Error ocuured. No question exists for this tag.');
                    }
                }) .catch(e => {
                    enqueueSnackbar('Error occured. Please try again.');
                })
        }
    }

    function handleClickMore(question) {
        return() => {
            setQuestionToDisplay(question);
            setOpenDisplayQuestion(true);
        }
    }

    function handleClickAddQuestion() {
        setOpenEditor(true);
    }

    return(
        <div>
            {(!search && !openDisplayQuestion && !openEditor) &&  <React.Fragment>
                <ActionBar
                    pageTitle={"Questions"}
                    actions={[
                        <div className={classes.actionButtons}>
                            <TextField 
                                label='e.g java'
                                onKeyPress={handleChangeSearchField}
                                type='text' 
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                }   
                            />
                            <Button onClick={handleClickAddQuestion} style = {{ color: 'rgba(70,132,243,1)' }}>Add Question</Button>
                        </div>
                    ]}
                /> 
                <div className={classes.cardsDisplay}>
                    {questions.map(question => (
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography style={{ paddingBottom: '10px'}}>Question - {question.description}</Typography>
                                <Typography style={{ paddingBottom: '10px'}}>Student Name - {question.name}</Typography>
                                <Typography style={{ paddingBottom: '10px'}}>Upvotes - {question.upvotes}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={handleClickMore(question)} style={{ color: 'rgba(70,132,243,1)' }} size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    ))} 
                </div>
                </React.Fragment>}
            {search && <SearchBox
                            questions={searchedQuestion}
                            handleClickMore={handleClickMore} 
                        />
            }   
            {openDisplayQuestion && <DisplayQuestion question={questionToDisplay}/>}    
            {openEditor && <AddQuestion />}    
        </div>
    );
}