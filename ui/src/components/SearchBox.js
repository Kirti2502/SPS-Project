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
}))

export default function SearchBox({ questions, handleClickMore }) {
    
    const classes = useStyles();

    return(
        <div>
            <ActionBar 
                pageTitle='Search'
            />
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
        </div>
    );
}