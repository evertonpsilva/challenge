import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import { green, red } from '@material-ui/core/colors';
import { DialogAnswerProps } from './types';

const useStyles = makeStyles((theme) => ({
    iconAnswer: {
        fontSize: 164,
        textAlign: 'center',
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    }
}));

const DialogAnswer: React.FC<DialogAnswerProps> = ({sucess, open, onClose}) => {
    
    const classes = useStyles();

    const icon = sucess ? <CheckCircleIcon className={classes.iconAnswer} style={{color: green[500]}}></CheckCircleIcon> : <CancelIcon className={classes.iconAnswer} style={{color: red[500]}}></CancelIcon>;

    const title = sucess ? "Correct answer" : "Wrong answer";

    return (
        <Dialog ref={React.createRef} open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
            <DialogContent>
                <Box className={classes.dialogContent}>
                    {icon}
                    {title}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}> Next </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogAnswer;