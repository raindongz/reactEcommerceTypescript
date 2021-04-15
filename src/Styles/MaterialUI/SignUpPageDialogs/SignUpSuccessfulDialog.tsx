import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useHistory} from "react-router-dom";

interface SignUpSuccessfulDialogProps{
    open:boolean;
    message:string;
    handleClose:()=>void;
}
export default function SignUpSuccessfulDialog(props: SignUpSuccessfulDialogProps) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Sign up Successful"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary" autoFocus>
                        Go to login page!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
