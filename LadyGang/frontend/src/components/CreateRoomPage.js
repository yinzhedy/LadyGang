import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { 
  useTheme,
  Grid,
  Box,
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
  const theme = useTheme();

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
    <Grid 
      container
    >


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
            paddingBottom: '7%'
            }}
        >
            Create A Room
        </Typography>
      </Grid >

      <Grid item xs={12} align="center">
        <Typography
          sx={{
            fontFamily: 'inherit',
            fontWeight: theme.typography.font_weight.extra_light,
            fontSize: theme.typography.font_size.s,
            color: 'black',
            width: '40%',
            paddingTop: '3%',
            backgroundColor: 'white'
            }}
        >
          Please enter a name for your room:
          <TextField
            required
            id="outlined-required"
            type="string"
            label="Required"
            onChange={handleNameChange}
            value={roomName}
            inputProps={{
              maxLength: 50,
              minLength:1,
              sx: {
                fontFamily: theme.typography.font_style.poppins,
                fontWeight: theme.typography.font_weight.light,
                textAlign: 'center',
              },
            }}
            sx={{
              "& .MuiInputLabel-root": {color: theme.palette.grey.light},
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: theme.palette.grey.light },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
                  borderColor: theme.palette.azure.light
                }
              },
            }}
          />
        </Typography>

      </Grid>


      <Grid item xs={12} align="center">
        <FormControl 
          component="fieldset"
          sx={{
            backgroundColor: 'white',
            width: '40%',
            paddingTop: '5%'
            }}
        >
          <Typography
            sx={{
              fontFamily: 'inherit',
              fontWeight: theme.typography.font_weight.extra_light,
              fontSize: theme.typography.font_size.s,
              color: 'black',
              paddingTop: '3%',
              backgroundColor: 'white'
              }}
          >
            Set whether guests can play and pause:
          </Typography>
          <RadioGroup
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
                row
                defaultValue="true"
                onChange={handleGuestCanPauseChange}
              >
                <FormControlLabel align='center'
                  value="true"
                  control={<Radio
                            sx={{
                              "&.Mui-checked": {
                              color: theme.palette.azure.main
                                }
                            }}
                          />}
                  label={<Typography sx={{
                                      fontFamily: 'inherit',
                                      fontSize: theme.typography.font_size.s,
                                      fontWeight: theme.typography.font_weight.extra_light,
                                      color: 'black'
                                      }}>
                          Yes
                        </Typography>}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio 
                            sx={{
                              "&.Mui-checked": {
                                color: theme.palette.azure.main
                              }
                            }}
                          />}
                  label={<Typography 
                            sx={{
                              fontFamily: 'inherit',
                              fontSize: theme.typography.font_size.s,
                              fontWeight: theme.typography.font_weight.extra_light,
                              color: 'black'
                            }}>
                            No
                          </Typography>}
                  labelPlacement="bottom"/>
          </RadioGroup>
        </FormControl>
      </Grid>


      <Grid item xs={12} align="center">

        <FormControl
          sx={{
            backgroundColor: 'white',
            width: '40%',
            paddingTop: '5%',
            fontFamily: 'inherit',
          }}
        >
          <Typography>
            <TextField
              required
              type="number"
              onChange={handleVotesChange}
              defaultValue={defaultVotes}
              label="Required"
              sx={{
                fontFamily: 'inherit',
                "& .MuiInputLabel-root": {color: theme.palette.grey.light},
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": { borderColor: theme.palette.grey.light },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    borderColor: theme.palette.azure.light
                  }
                },
              }}
              inputProps={{
                min: 1,
                max: 999,
                sx: {
                  fontFamily: theme.typography.font_style.poppins,
                  fontWeight: theme.typography.font_weight.light,
                  textAlign: 'center',
                },
              }}
            />
          </Typography>
        </FormControl>

        <Grid item xs={12} align="center"
          sx={{
            backgroundColor: 'white',
            width: '40%',
            paddingTop: '5%',
            paddingBottom: '5%'
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
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
            Create
          </Button>
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
            to="/music"
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


    </Grid>
    </Box>
  );
};

export default CreateRoomPage;