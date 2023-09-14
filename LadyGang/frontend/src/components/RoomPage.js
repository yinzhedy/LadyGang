import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {useTheme, Box, Grid, Button, Typography} from '@mui/material'

function RoomPage() {
  const { roomCode } = useParams();
  const [roomName, setRoomName] = useState('');
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomCodeDisplay, setRoomCodeDisplay] = useState(roomCode);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  // Use the useEffect hook to simulate componentDidMount behavior
  
  useEffect(() => {


    fetch(`/api/get-room/${roomCode}`)
      .then(response => {
        if (!response.ok){
          console.log(roomCode + "im in roomPage")
          console.log(response + "im in roomPage")
          console.log('Bad Response for GET room:' + response)
          navigate('/music')
        }
        else {
          return response.json()
        }
        })
      .then(data => {
        console.log(data)
        console.log('im in room page')
        if (data) {
          setRoomName(data.room_name)
          setVotesToSkip(data.votes_to_skip);
          setGuestCanPause(data.guest_can_pause);
          setIsHost(data.is_host);
          setShowSettings(data.is_host)
          if (data.is_host === true) {
            console.log('triggered')
            authenticateSpotify()
          }
        } 
        else {
          // Handle the case when there are no rooms with the given code
          setRoomName('No Room Name Found')
          setRoomCodeDisplay('No Room Code Found')
          setVotesToSkip('No data');
          setGuestCanPause('No data');
          setIsHost(false)
          console.log('No room data found');
        }
      });
  }, [roomCode]);

  function authenticateSpotify() {
    fetch(`/spotify/is-authenticated`)
    .then(response => {
      if (!response.ok){
        console.log(response)
        console.log('Issue with fetching is-authenticated api endpoint')
      }
      else {
        return response.json()
      }
      })
    .then(data => {
      console.log(data)
      setSpotifyAuthenticated(data.status)
      if(!data.status) {
        fetch(`/spotify/get-auth-url`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data.url)
          window.location.replace(data.url);
        })
      }
    });
  }

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type': 'application/json'}
    }
    fetch('/api/leave-room', requestOptions)
            .then((response) => {
                if (!response.ok) {
                  console.log('Bad Response for leave room:'+ response)
                  throw new Error('Network response was not ok');
                }
                else {
                  console.log('Network response was ok');
                  navigate('/music')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
  }

  function handleSettingsButtonClicked() {
    if (isHost === true) {
      let path = '/music/room/'+ roomCode + '/settings'
      console.log('path is:' + path)
      navigate(path)
    }
    else {
      console.log('Failed the final test, is not host. Access Denied.')
    }
  }

  function renderHostGreeting() {
      return(
        <Grid item xs={12} align='center'>
            <Typography
            sx={{
              fontFamily: theme.typography.font_style.sacramento,
              fontWeight: theme.typography.font_weight.light,
              fontSize: theme.typography.font_size.l,
              color: 'black',
              width: '40%',
              paddingBottom: '5%',
              }}
            >
                lets jam
            </Typography>
        </Grid>
      )
  }

  function renderSettingsButton() {

      console.log('showSettings is: ' + showSettings)
      return (
        <Grid 
          item xs={12} 
          align='center'
        >
          <Typography
            sx={{
              width: '40%',
              paddingTop: '3%',
              paddingBottom: '5%',
              backgroundColor: 'white'
            }}
          >
            <Button 
            variant='contained'
            color='primary'
            onClick={() =>{
              handleSettingsButtonClicked()
            }}
            sx={{
              backgroundColor: theme.palette.chloe_beige.main,
              ':hover': {
                  color: 'white',
                  bgcolor: theme.palette.chloe_beige.main
              },
              color: 'inherit',
              fontFamily: 'inherit',
              fontSize: theme.typography.font_size.s,
              fontWeight: theme.typography.font_weight.extra_light,
              borderRadius: '.15rem',
            }}
          >
              Room Settings
            </Button>
          </Typography>
          
        </Grid>
      )
    };


  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'center',
      wrap: 'wrap',
      marginTop: '0',
      marginLeft: '0',
      height: '100%',
      width: '100% + 24px',
      backgroundColor: theme.palette.chloe_beige.main,
      fontFamily: theme.typography.font_style.poppins,
    }}
    >
      <Grid container spacing={0}>

        <Grid item xs={12} align='center'>
          <Typography
            variant='h4'
            component='h4'
            sx={{
              fontFamily: theme.typography.font_style.chloe,
              fontWeight: theme.typography.font_weight.bold,
              fontSize: theme.typography.font_size.title,
              color: 'white',
              paddingTop: '8%',
              }}
          >
            {roomName}
          </Typography>
        </Grid>
        {isHost ? renderHostGreeting() : null}
        <Grid item xs={12} align='center'>
          <Typography 
            sx={{
              fontFamily: 'inherit',
              fontWeight: theme.typography.font_weight.extra_light,
              fontSize: theme.typography.font_size.m,
              color: 'black',
              width: '40%',
              paddingTop: '3%',
              backgroundColor: 'white'
              }}
          >
            Code: {roomCodeDisplay}
          </Typography>
        </Grid>

        <Grid item xs={12} align='center'>
          <Typography
            sx={{
              fontFamily: 'inherit',
              fontWeight: theme.typography.font_weight.extra_light,
              fontSize: theme.typography.font_size.m,
              color: 'black',
              width: '40%',
              paddingTop: '3%',
              backgroundColor: 'white'
              }}s
          >
            Votes: {votesToSkip}
          </Typography>
        </Grid>

        <Grid item xs={12} align='center'>
          <Typography
            sx={{
              fontFamily: 'inherit',
              fontWeight: theme.typography.font_weight.extra_light,
              fontSize: theme.typography.font_size.m,
              color: 'black',
              width: '40%',
              paddingTop: '3%',
              backgroundColor: 'white'
              }}
          >
            Guest Can Pause: {guestCanPause ? 'Yes' : 'No'}
          </Typography>
        </Grid>
        {showSettings ? renderSettingsButton() : null }
        <Grid 
          item xs={12} 
          align='center'
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
            color='secondary' 
            variant='contained' 
            onClick={leaveButtonPressed}
            sx={{
              backgroundColor: 'white',
              ':hover': {
                  color: 'white',
                  bgcolor: theme.palette.chloe_beige.main,
                  borderColor: 'white',
              },
              color: 'inherit',
              fontFamily: 'inherit',
              fontSize: theme.typography.font_size.s,
              fontWeight: theme.typography.font_weight.light,
              borderRadius: '.25rem',
              borderStyle: 'solid',
              borderColor: 'black',
              borderWidth: '.1rem'

            }}
          >
            Leave Room
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoomPage;





