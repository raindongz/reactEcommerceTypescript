import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
interface addNewProductSnackBarProps{
    open:boolean
    handleSnackBarClose: () => void;
}
export default function AddNewProductSnackbars(props:addNewProductSnackBarProps) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleSnackBarClose}>
                <Alert onClose={props.handleSnackBarClose} severity="success">
                    Update Product Successful!
                </Alert>
            </Snackbar>
        </div>
    );
}