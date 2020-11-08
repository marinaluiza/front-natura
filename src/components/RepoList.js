import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import axios from 'axios';

const RepoList = ({repos, auth, loading}) => {

    const BACK_URL = 'http://localhost:3333';
    const [favorites, setFavorites] = useState({});

    const handleStarRepo = (owner, repo, id) => {
        if(!favorites[id]) {
            axios.put(`${BACK_URL}/starred/${owner}/${repo}`, {
                auth: auth
            }).then(() => {
                console.log(id);
                setFavorites({...favorites, [id]: true})
            }).catch(error => console.error(error))
        }  
    };
    return (
        <>
            {!loading ? 
            (<List>
                {(repos && repos.length > 0) ? repos.map(repo => (
                        <ListItem key={repo.id}>
                            <ListItemText primary={repo.name} />
                            <ListItemSecondaryAction>
                                <IconButton 
                                    edge="end" 
                                    disabled={auth === ''} 
                                    onClick={() => handleStarRepo(repo.owner.login, repo.name, repo.id)}
                                >
                                    {favorites[repo.id] ? <StarIcon /> : <StarBorderIcon />}
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                    : (
                        <ListItem>
                            <ListItemText primary="None repositories"/>
                        </ListItem>
                    )
                }
            </List>)
            : (<Skeleton variant="text"/>)}
        </>
    )
};

export default RepoList;
