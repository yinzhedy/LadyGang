import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, ButtonGroup, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const HomePage = () => {
    console.log('hi im homepage')
    const navigate = useNavigate();

    useEffect(() => {
        console.log('this is the homepage')
    }, []);

    return (
        <Grid container spacing={3}>
            
            <Grid item xs={12} align='center'>
                <Typography variant='h3' component='h3'>
                    Lady Gang
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
            <ButtonGroup disableElevation variant='contained' color='primary'>
                <Button color='primary' onClick={() => { navigate('/music')}}>
                    Music Rooms
                </Button>
            </ButtonGroup>
            </Grid>
        </Grid>
    )
};

export default HomePage;