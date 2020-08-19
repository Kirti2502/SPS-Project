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
import { CircularProgress } from '@material-ui/core';
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

// services
// errors
// utils
// configuration
import configuration from '../../configuration/configuration';

// icons
// assets
// styles

export default function Dashboard() {

    const enqueueSnackbar = useSnackbar();
    const [ questions, setQuestions] = React.useState([]);
    const [ openDisplayQuestion, setOpenDisplayQuestion ] = React.useState(false);
    const [ search, setSearch ] = React.useState(false);
    const [ searchField, setSearchField ] = React.useState('');
    const [ searchedQuestion, setSearchedQuestion ] = React.useState([]);

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

    function handleClickMore() {
        setOpenDisplayQuestion(true);
    }

    return(
        <div>
            <ActionBar
                pageTitle={"Questions"}
                actions={[
                    <TextField 
                        label='Search'
                        onKeyPress={handleChangeSearchField}
                        type='text' 
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        }   
                    />
                ]}
            /> 
            {(!search && !openDisplayQuestion) &&  <React.Fragment>
                {questions.map(question => (
                    <Card>
                        <CardContent>
                            <Typography>{question.description}</Typography>
                            <Typography>{question.name}</Typography>
                            <Typography>{question.upvotes}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleClickMore} size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                ))} 
            </React.Fragment>}
            {search && <SearchBox
                            questions={searchedQuestion}
                            handleClickMore={handleClickMore} 
                        />
            }   
            {openDisplayQuestion && <DisplayQuestion />}        
        </div>
    );
}