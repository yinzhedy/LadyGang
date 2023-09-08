import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const RoomJoinPage = () => {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
        setError(false); // Clear the error when the text field changes
    };

    const roomButtonPressed = () => {
        console.log(roomCode + ' this is line 16');
        if (roomCode.trim() === '') {
            setError(true);
            console.log('room code was empty');
        } else {
            console.log(roomCode);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: roomCode
                })
            };

            fetch('/api/join-room', requestOptions)
                .then((response) => {
                    if (response.ok) {
                        console.log('code is valid, room exists, navigating there now.');
                        navigate('/room/' + roomCode);
                    } else {
                        setError(true);
                        console.log('code invalid, no room found');
                        window.alert('Invalid code. No matching room found.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                <Typography variant='h4' component='h4'>
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <TextField
                    error={error}
                    label='Code'
                    placeholder='Enter a Room Code'
                    variant='outlined'
                    helperText={error ? 'Invalid Code' : ''}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary' onClick={roomButtonPressed}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='secondary' to='/' component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
};

export default RoomJoinPage;
