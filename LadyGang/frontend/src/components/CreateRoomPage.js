import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Grid,
  Typography,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel }
  from '@mui/material'


const CreateRoomPage = () => {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setRoomName(e.target.value)
  }

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === 'true');
  };

  const handleRoomButtonPressed = () => {
    console.log(roomName)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_name: roomName,
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        }),
      };
      console.log('Request Options:', requestOptions)
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate('/music/room/' + data.code);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };


  return (
    <Grid container spacing={3}>


      <Grid item xs={12} align="center">
        <Typography component="h3" variant="h3">
          Create A Room
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <TextField
            required
            type="string"
            label="Room Name (required)"
            onChange={handleNameChange}
            value={roomName}
            inputProps={{
              style: { textAlign: 'center' },
            }}
          />
      </Grid>


      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}>
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"/>
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"/>
          </RadioGroup>
        </FormControl>
      </Grid>


      <Grid item xs={12} align="center" spacing={3}>

        <FormControl>
          <TextField
            required
            type="number"
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            label="Votes Required To Skip Song"
            inputProps={{
              min: 1,
              style: { textAlign: 'center' },
            }}
          />
        </FormControl>

        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}>
            Create A Room
          </Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button
            color="secondary"
            variant="contained"
            component={Link}
            to="/music">
            Back
          </Button>
        </Grid>

      </Grid>


    </Grid>
  );
};

export default CreateRoomPage;