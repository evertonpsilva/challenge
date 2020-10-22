import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    loadingContainer: {
        display: 'flex',
        flex: 1,
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const Loading: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.loadingContainer}>
            <CircularProgress ></CircularProgress>
        </div>
    );
}

export default Loading;