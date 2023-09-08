import React, { useState } from 'react';
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {

    const [roomCode, setRoomCode] = useState(null);
    const [inRoom, setInRoom] = useState(false);
    const navigate = useNavigate();

    //ensures application isnt waiting on this function to finish to perform other actions
    function checkIfUserInRoom() {
        fetch('/api/user-in-room')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setInRoom(true);
                setRoomCode(data.code);
                if (inRoom === true) {
                    navigate('/room/' + data.code);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function renderHomePage() {
        checkIfUserInRoom()
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align='center'>
                    <Typography variant='h3' component='h3'>
                        Lady Gang
                    </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                <ButtonGroup disableElevation variant='contained' color='primary'>
                    <Button color='primary' onClick={() => {navigate('/join')}} component={Link}>
                        Join A Room
                    </Button>
                    <Button color='secondary' onClick={() => {navigate('/create')}} component={Link}>
                        Create A Room
                    </Button>
                </ButtonGroup>
                </Grid>
            </Grid>
        )
    }

    return renderHomePage();
};

export default HomePage;