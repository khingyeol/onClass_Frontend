import { Dialog, DialogProps, IconButton, Theme, Typography } from '@mui/material';
import React, { FC, memo } from 'react';
import { makeStyles } from '@mui/styles';

interface OCDialogProps extends DialogProps {
    title: string;
    message?: string;
    
}

const OCDialog: FC<OCDialogProps> = (props) => {
    const classes = useStyles();
    const {title, message, open, ...otherProps } = props;

    return (
        <Dialog {...otherProps} open={open} >
            <div>
                Dialog {title} {message}
            </div>
        </Dialog>
    )
}

export default OCDialog;

const useStyles = makeStyles((theme: Theme) => ({
    container: {

    }
}));
