import React, { useState, useEffect } from 'react';
import { useTheme, Grid, Button, ButtonGroup, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { create } from '@mui/material/styles/createTransitions';

const MusicHomePage = () => {
    const [roomCode, setRoomCode] = useState(null);
    const [inRoom, setInRoom] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

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
        <Grid container spacing={3} 
            sx={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                wrap: 'wrap',
                marginTop: '0',
                height: '100%',
                width: '100%',
                backgroundColor: theme.palette.chloe_beige.main
            }}
        >
            <Grid item xs={12} align='center'>
                <Typography
                    variant='h3'
                    component='h3'
                    sx={{
                        fontFamily: theme.typography.font_style.chloe,
                        fontWeight: theme.typography.font_weight.bold,
                        fontSize: theme.typography.font_size.hero,
                        color: 'white',
                        paddingTop: '8%'
                    }}>
                    Music
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
            <ButtonGroup disableElevation variant='contained'
                sx={{
                    backgroundColor: 'white',
                    color: 'inherit',
                    fontFamily: theme.typography.font_style.poppins,
                    fontSize: theme.typography.font_size.s,
                    fontWeight: theme.typography.font_weight.extra_light,
                    padding: '2%',
                    borderRadius: '2px'
                }}
            >
                <Button color='primary'
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            fontFamily: theme.typography.font_style.poppins,
                            fontSize: theme.typography.font_size.s,
                            fontWeight: theme.typography.font_weight.extra_light,
                            padding: '2%',
                            width: '50%',
                            ':hover': {
                                bgcolor: theme.palette.chloe_beige.main,
                                color: 'white',
                            }
                        }}
                        onClick={() => {
                        console.log(roomCode)
                        if (roomCode === null) {
                            navigate('/music/join')
                        }
                        else {
                            navigate('/music/room/' + roomCode)
                        }}}>
                    Join A Room
                </Button>
                <Button color='secondary' 
                        sx={{
                            backgroundColor: 'white',
                            color: 'inherit',
                            fontFamily: theme.typography.font_style.poppins,
                            fontSize: theme.typography.font_size.s,
                            fontWeight: theme.typography.font_weight.extra_light,
                            padding: '2%',
                            ':hover': {
                                bgcolor: theme.palette.chloe_beige.main,
                                color: 'white',
                            }
                        }}
                        onClick={() => {
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
            <Grid item xs={12} align="center"
                sx={{
                    width: '100%',
                    paddingTop: '3%',
                    paddingBottom: '3%',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    bottom: '0',
                }}
            >
                <Button 
                    xs={12}
                    variant="contained"
                    component={Link}
                    to="/"
                    sx={{
                        backgroundColor: 'white',
                        ':hover': {
                            color: 'white',
                            bgcolor: theme.palette.chloe_beige.main,
                            borderColor: 'white',
                        },
                        color: 'inherit',
                        fontFamily: theme.typography.font_style.poppins,
                        fontSize: theme.typography.font_size.s,
                        fontWeight: theme.typography.font_weight.extra_light,
                        borderRadius: '.25rem',
                        borderStyle: 'solid',
                        borderColor: 'black',
                        borderWidth: '.1rem'

                    }}
                >
                    Back
                </Button>
            </Grid>
        </Grid>
    )
};

export default MusicHomePage;