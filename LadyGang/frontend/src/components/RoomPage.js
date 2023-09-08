import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {Grid, Button, Typography} from '@mui/material'

function RoomPage() {
  const { roomCode } = useParams();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomName, setRoomName] = useState(roomCode)
  const navigate = useNavigate();

  // Use the useEffect hook to simulate componentDidMount behavior
  useEffect(() => {
    fetch(`/api/get-room/${roomCode}`)
      .then(response => {
        if (!response.ok){
          console.log('Bad Response for GET room:' + response)
          navigate('/')
        }
        else {
          return response.json()
        }
        })
      .then(data => {
        console.log(data)
        if (data) {
          // grab first room in array
          setVotesToSkip(data.votes_to_skip);
          setGuestCanPause(data.guest_can_pause);
          setIsHost(data.is_host);
        } 
        else {
          // Handle the case when there are no rooms with the given code
          setRoomName('No Room Found')
          setVotesToSkip('No data');
          setGuestCanPause('No data');
          setIsHost(false)
          console.log('No room data found');
        }
      });
  }, [roomCode]);

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
                  navigate('/')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
  }

  return (
    <div>
      <Grid container spacing={1}>

        <Grid xs={12} align='center'>
          <Typography variant='h4' component='h4'>
            Code: {roomName}
          </Typography>
        </Grid>

        <Grid xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Votes: {votesToSkip}
          </Typography>
        </Grid>

        <Grid xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Guest Can Pause: {guestCanPause ? 'Yes' : 'No'}
          </Typography>
        </Grid>

        <Grid xs={12} align='center'>
          <Typography variant='h6' component='h6'>
            Host: {isHost ? 'Yes' : 'No'}
          </Typography>
        </Grid>

        <Grid xs={12} align='center'>
          <Button color='secondary' variant='contained' onClick={leaveButtonPressed}>
            Leave Room
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default RoomPage;





