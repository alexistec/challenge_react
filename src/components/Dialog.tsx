import React  from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Button} from '@material-ui/core';

interface IProps{
    message:string,
    openModal: boolean,
    onConfirm : () => void,
    handlerClose : () => void
}

const DialogModal = ({ message,openModal,onConfirm,handlerClose}: IProps) => {
    return(
        <Dialog
            open={openModal}
            onClose={handlerClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button  color="primary" onClick={()=>handlerClose()}>
                    Cancel
                </Button>
                <Button color="secondary" autoFocus  onClick={()=>onConfirm()}>
                    Yes, sure
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogModal;