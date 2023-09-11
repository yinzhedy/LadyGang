import React, { useState } from 'react';
import { useTheme, TextField, Button, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const RoomJoinPage = () => {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
        setError(false); // Clear the error when the text field changes
    };

    const roomButtonPressed = () => {
        console.log(roomCode + ' this is line 16');
        if (roomCode.trim() === '') {
            setError(true);
            console.log('room code was empty');
        }

        else {
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
                        navigate('/music/room/' + roomCode);
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
        <Grid 
            container 
            spacing={1}
            sx={{
                marginTop: '0',
                height: '100%',
                width: '100%',
                backgroundColor: theme.palette.chloe_beige.main
            }}
        >
            <Grid item xs={12} align='center'>
                <Typography variant='h4' component='h4'
                    sx={{
                        fontFamily: theme.typography.font_style.chloe,
                        fontWeight: theme.typography.font_weight.bold,
                        fontSize: theme.typography.font_size.title,
                        color: 'white',
                        paddingTop: '8%'
                    }}
                >
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12}
                align='center' 
                sx={{
                    height: '50%'
                }}
            >
                <Grid 
                xs={12}
                container 
                alignItems="center"
                justifyContent="center"
                spacing={5}
                backgroundColor="white"
                width='50%'
                borderRadius='.25rem'
                textAlign='center'
                padding='1rem'
                >
                    {/* added backgroundColor="white", width='50%', borderRadius='1.4rem',
                    textAlign='center', padding='1rem' (just for some padding from the bottom),
                    here ^^ */}
                    <Grid item xs={8} align='center'>
                        <Typography
                            sx={{
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.s,
                                fontWeight: theme.typography.font_weight.light,
                                backgroundColor: 'white',
                                width: '100%',
                                justifyContent:'center',
                                // changed width 45% to 100% 
                            }}
                        >
                            Please enter the room code:
                        </Typography>
                    </Grid>
                    <Grid item xs={8} 
                        sx={{
                            height: '100%'
                        }}
                    >
                        <TextField
                            error={error}
                            label='Code'
                            placeholder='Enter a Room Code'
                            variant='outlined'
                            helperText={error ? 'Invalid Code' : ''}
                            onChange={handleTextFieldChange}
                            sx={{
                                fontFamily: theme.typography.font_style.sacramento
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button 
                            variant='contained' 
                            color='primary' 
                            onClick={roomButtonPressed}
                            sx={{
                                backgroundColor: theme.palette.chloe_beige.main,
                                ':hover': {
                                    color: 'white',
                                    bgcolor: theme.palette.chloe_beige.main
                                },
                                color: 'inherit',
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.s,
                                fontWeight: theme.typography.font_weight.extra_light,
                                borderRadius: '.15rem'
                            }}>
                            Enter Room
                        </Button>
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid item xs={12} align='center'>
                <Button 
                    variant='contained' 
                    color='secondary' 
                    to='/music' 
                    component={Link}
                    sx={{
                        backgroundColor: 'white',
                        ':hover': {
                            color: 'white',
                            bgcolor: theme.palette.chloe_beige.main,
                            borderColor: 'white'
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
    );
};

export default RoomJoinPage;
