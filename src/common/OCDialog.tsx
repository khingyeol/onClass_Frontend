import { Box, Dialog, DialogProps, IconButton, Theme, Typography } from '@mui/material';
import React, { FC, memo, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getDialogState } from '../store/dialog/selector';
import { hideDialog } from '../store/dialog/action';
import OCButton from './OCButton';

export interface OCDialogProps extends DialogProps {
    title: string;
    message?: string;
    onClose?: () => void;
    primaryLabel?: string;
    onPrimaryAction?: () => void;
    secondaryLabel?: string;
    onSecondaryAction?: () => void;
}

const OCDialog: FC = () => {
    const dispatch = useDispatch();
    const dialogState = useSelector(getDialogState)
    const classes = useStyles();
    const { isShow, title, message, onClose, primaryLabel, onPrimaryAction, secondaryLabel, onSecondaryAction, ...otherProps } = dialogState
    // const {title, message, onClose, ...otherProps } = props;

    const handleCloseDialog = () => {
        if (onClose) { onClose(); }
        dispatch(hideDialog());
    }

    const handlePrimaryAction = () => {
        if (onPrimaryAction) { onPrimaryAction(); }
    }

    const handleSecondaryAction = () => {
        if (onSecondaryAction) { onSecondaryAction(); }
    }

    useEffect(() => {
        console.log('ee')
    })

    return (
        <Dialog {...otherProps} className={classes.root} open={isShow} onClose={handleCloseDialog} >
            <Box className={classes.content}>
                <Typography variant="h1" className={classes.title}>
                    {title}
                </Typography>
                <Typography className={classes.message}>
                    {message}
                </Typography>
                <Box className={classes.btnBox}>
                    {secondaryLabel && <OCButton variant='outline' className={classes.secondaryLabel} label={secondaryLabel} onClick={handleSecondaryAction} />}
                    {primaryLabel && <OCButton label={primaryLabel} onClick={handlePrimaryAction} />}
                </Box>
            </Box>
        </Dialog>
    )
}

export default OCDialog;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiPaper-root': {
            borderRadius: "35px",
            width: "80%",
            boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
            backgroundColor: "white",
            [theme.breakpoints.down("sm")]: {
                borderRadius: "25px",
                padding: "0 20px",
                margin: "10px 40px",
                height: "auto",
            },
        },
        justifyContent: "center",

    },
    content: {
        padding: "40px",
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
        // justifyItems: "center",
        gap: "30px",
        [theme.breakpoints.down("sm")]: {
            padding: "20px",
            gap: "20px",
        },
    },
    title: {
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            fontSize: '24px',
        },
    },
    message: {
        fontSize: '27px',
        textAlign: "center",
        [theme.breakpoints.down("sm")]: {
            fontSize: '16px',
        },
    },
    btnBox: {
        maxWidth: '385px',
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    secondaryLabel: {
        fontSize: '18px',
        // fontWeight: '',
        [theme.breakpoints.down("sm")]: {
            fontSize: '5px',
        },
    }
}));
