// Core React
import React from 'react';

// External libraries
// MUI hooks
import { makeStyles } from '@material-ui/core/styles';

// MUI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

export default function SearchBox({ questions }) {
    
    const classes = useStyles();

    return(
        <div>
            {questions.map(question => (
                <Card>
                    <CardContent>
                        <Typography>{question.description}</Typography>
                        <Typography>{question.name}</Typography>
                        <Typography>{question.upvotes}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}