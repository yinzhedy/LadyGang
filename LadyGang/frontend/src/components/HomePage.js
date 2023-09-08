import React from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const joinRoomButtonPressed = () => {
        navigate('/join'); // Navigate to the '/join' route
    };

    const createRoomButtonPressed = () => {
        navigate('/create'); // Navigate to the '/create' route
    };

    return (
        <Grid container>
            <Grid item xs={12} align='center'>
                <h3>HomePage</h3>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='primary' onClick={createRoomButtonPressed}>
                    Create A Room
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button variant='contained' color='secondary' onClick={joinRoomButtonPressed}>
                    Join A Room
                </Button>
            </Grid>
        </Grid>
    );
};

export default HomePage;