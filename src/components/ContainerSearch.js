import React, { useState } from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import RepoList from './RepoList';
import AuthModal from './AuthModal';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 450
    },
  }));
  

const ContainerSearch = () => {

    const BACK_URL = 'http://localhost:3333';
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [repos, setRepos] = useState([]);
    const [auth, setAuth] = useState('');
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleSearchUsername = () => {
        setLoading(true);
        username !== '' && axios.get(`${BACK_URL}/users/${username}`).then(result => {
            setRepos(result.data);
            setUsername('');
            setLoading(false);
        })
    };

    const handleClear = () => {
        setRepos([]);
        setUsername('');
    };

    const handleOpenAuth = () => {
        setOpen(true);
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <TextField 
                    label="Username" 
                    placeholder="Type a username to search public repos" 
                    value={username} 
                    onChange={handleChangeUsername}
                />
                <Button onClick={handleSearchUsername}>
                    Search
                </Button>
                <Button onClick={handleClear}>
                    Clear
                </Button>
                <Button onClick={handleOpenAuth}>
                    {auth === '' ? 'Auth' : 'Authenticated'}
                </Button>
            </Grid>
            <Grid item xs={12}>     
                <RepoList repos={repos} auth={auth} loading={loading} />
            </Grid>

            <AuthModal open={open} setOpen={setOpen} setAuth={setAuth} />
        </Grid>
    )
};

export default ContainerSearch;

