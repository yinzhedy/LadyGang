import React, { useState, useEffect } from 'react';
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { create } from '@mui/material/styles/createTransitions';

const MusicHomePage = () => {
    const [roomCode, setRoomCode] = useState(null);
    const [inRoom, setInRoom] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('checking if user in room')
            fetch('/api/user-in-room')
                .then((response) => {
                    console.log(response)
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setInRoom(true);
                    setRoomCode(data.code);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
    }, [roomCode]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
                <Typography variant='h3' component='h3'>
                    Music Rooms
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
            <ButtonGroup disableElevation variant='contained' color='primary'>
                <Button color='primary' onClick={() => {
                        console.log(roomCode)
                        if (roomCode === null) {
                            navigate('/music/join')
                        }
                        else {
                            navigate('/music/room/' + roomCode)
                        }}}>
                    Join A Room
                </Button>
                <Button color='secondary' onClick={() => {
                        console.log(roomCode)
                        if (roomCode === null) {
                            navigate('/music/create')
                        }
                        else {
                            navigate('/music/room/' + roomCode)
                        }}}>
                    Create A Room
                </Button>
            </ButtonGroup>
            </Grid>
        </Grid>
    )
};

export default MusicHomePage;