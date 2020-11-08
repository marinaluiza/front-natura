import React, { useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Button, TextField } from '@material-ui/core';


const AuthModal = ({open, setOpen, setAuth}) => {

    const [password, setPassword] = useState('');
    const [usernameAuth, setUsernameAuth] = useState('');

    const handleCloseModal= () => {
        setOpen(false);
    };

    const handleAuth = () => {
        setAuth(btoa(`${usernameAuth}:${password}`));
        setOpen(false);
    }

    return (
        <>
            <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Autentication</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To star an unstar repos, please authenticate yourself.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="uername"
                    label="Username"
                    type="text"
                    value={usernameAuth}
                    onChange={(event) => setUsernameAuth(event.target.value)}
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAuth} color="primary">
                    Authenticate
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default AuthModal;
