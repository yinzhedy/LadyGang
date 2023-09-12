import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    useTheme, 
    Collapse,
    Card, 
    Grid, 
    Box, 
    Button, 
    IconButton, 
    Typography, 
    TextField, 
    FormControl, 
    FormControlLabel, 
    RadioGroup, 
    Radio} 
    from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function RoomSettingsPage() {
    const { roomCode } = useParams();
    const [roomName, setRoomName] = useState('');
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [roomCodeDisplay, setRoomCodeDisplay] = useState(roomCode);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingVotes, setIsEditingVotes] = useState(false);
    const [isEditingPause, setIsEditingPause] = useState(false);
    const [roomUpdated, setRoomUpdated] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
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
        if (data) {
            setRoomName(data.room_name)
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
        } 
        else {
          // Handle the case when there are no rooms with the given code
            setRoomName('No Room Name Found')
            setRoomCodeDisplay('No Room Code Found')
            setVotesToSkip('No data');
            setGuestCanPause('No data');
            console.log('No room data found');
        }
        });
    }, [roomCode]);

    function saveButtonPressed() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                room_name: roomName,
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
                code: roomCode,
                }),
            };
            fetch('/api/update-room', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data) {
                    setRoomUpdated(true);
                    setUpdateMessage('Room settings updated!')
                    console.log('Room successfully updated!')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setRoomUpdated(false)
                setUpdateMessage('Error: ' + error)
            });
    };

    function backButtonPressed() {
        navigate('/music/room/'+ roomCode)
        return
    }

    //Editable Typography Code
    function handleSaveIconClick(target) {
        setRoomUpdated(false)

        if (target === 'roomName') {
            setIsEditingName(false);
        }
        else if (target === 'votesToSkip') {
            setIsEditingVotes(false);
        }
        else if (target=== 'guestCanPause') {
            setIsEditingPause(false);
        }
        setIsEditing(false);
    }

    function handleEditIconClick(target) {
        setRoomUpdated(false)

        if (target === 'roomName') {
            setIsEditingName(true);
        }
        else if (target === 'votesToSkip') {
            setIsEditingVotes(true);
        }
        else if (target === 'guestCanPause') {
            setIsEditingPause(true);
        }
        setIsEditing(true);
        return
    }

    const handleChange = (e) => {
        if (isEditingName) {
            setRoomName(e.target.value)
        }
        else if (isEditingPause){
            setGuestCanPause(e.target.value)

        }
        else if (isEditingVotes){
            setVotesToSkip(e.target.value)

        }
        else {
            console.log(e)
            console.log(e.target.value)
        }

    }


    function renderEditableElement(component_param, type_param, target_param) {

        if (component_param === 'TextField') {


            if (type_param === 'string') {


                if (isEditingName === true) {
                    return (
                        <div>
                            <Typography
                                align='center'
                                sx={{
                                    fontFamily: theme.typography.font_style.poppins,
                                    fontSize: theme.typography.font_size.m,
                                    fontWeight: theme.typography.font_weight.extra_light
                                }}   
                            >
                                Room Name:
                            </Typography>
                            <TextField
                                value={roomName}
                                type={type_param}
                                autoFocus={isEditing}
                                onChange={handleChange}
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
                            <IconButton
                                color='black'
                                aria-label={isEditing ? 'Save' : 'Edit'}
                                onClick={() => {isEditing ? handleSaveIconClick(target_param) : handleEditIconClick(target_param)}}
                            >
                                {(isEditingName ? <SaveIcon /> : <EditIcon />)}
                            </IconButton>
                        </div>
                    );
                }
                else {
                    return(
                        <div>
                        <Typography
                            align='center'
                            sx={{
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.m,
                                fontWeight: theme.typography.font_weight.extra_light
                            }}    
                        >
                            Room Name:
                        </Typography>
                        <Typography
                            align='center'
                            sx={{
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.s,
                                fontWeight: theme.typography.font_weight.extra_light
                            }}
                        >
                            {roomName}
                            <IconButton
                                color='black'
                                aria-label={isEditing ? 'Save' : 'Edit'}
                                onClick={() => {isEditing ? handleSaveIconClick(target_param) : handleEditIconClick(target_param)}}
                            >
                            {isEditingName ? <SaveIcon /> : <EditIcon />}
                            </IconButton>
                        </Typography>
                        </div>
                    )
                }


            }
            else if(type_param === 'number') {


                if (isEditingVotes === true) {
                    return (
                        <div>
                        <Typography
                            align='center'
                            sx={{
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.m,
                                fontWeight: theme.typography.font_weight.extra_light
                            }}   
                        >
                            Votes to Skip:
                        </Typography>
                        <TextField
                            value={votesToSkip}
                            type={type_param}
                            autoFocus={isEditing}
                            onChange={handleChange}
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
                        <IconButton
                            color='black'
                            aria-label={isEditing ? 'Save' : 'Edit'}
                            onClick={() => {isEditing ? handleSaveIconClick(target_param) : handleEditIconClick(target_param)}}
                        >
                            {(isEditingVotes ? <SaveIcon /> : <EditIcon />)}
                        </IconButton>
                        </div>
                    );
                }
                else {
                    return (
                        <div>
                        <Typography
                            align='center'
                            sx={{
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.m,
                                fontWeight: theme.typography.font_weight.extra_light
                            }}   
                        >
                            Votes to Skip:
                        </Typography>
                        <Typography
                            align='center'
                            sx={{
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.s,
                                fontWeight: theme.typography.font_weight.extra_light
                            }}
                        >
                            {votesToSkip}
                            <IconButton
                                color='black'
                                aria-label={isEditing ? 'Save' : 'Edit'}
                                onClick={() => {isEditing ? handleSaveIconClick(target_param) : handleEditIconClick(target_param)}}
                            >
                            {isEditingVotes ? <SaveIcon /> : <EditIcon />}
                            </IconButton>
                        </Typography>
                        </div>
                    )
                    

                }


            }
        } 
        else if (component_param === 'RadioGroup') {
            if (isEditingPause === true) {
                return (
                    <div>
                        <Typography 
                            align='center'
                            sx={{
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.m,
                                fontWeight: theme.typography.font_weight.extra_light
                            }}   
                        >
                            Guest Can Pause:
                        </Typography>
                        <RadioGroup
                            row
                            defaultValue="true"
                            onChange={handleChange}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                        <FormControlLabel
                            value="true"
                            labelPlacement="bottom"
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
                            Yes
                                </Typography>}
                        />
                        <FormControlLabel
                            value="false"
                            labelPlacement="bottom"
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
                        />
                        </RadioGroup>
                        <IconButton
                        color='black'
                        aria-label={isEditingPause ? 'Save' : 'Edit'}
                        onClick={() => {isEditing ? handleSaveIconClick(target_param) : handleEditIconClick(target_param)}}
                    >
                        {isEditingPause ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                        </div>
                )
            }
            else {
                return (
                    <div>
                        <Typography 
                            align='center'
                            sx={{
                                fontFamily: theme.typography.font_style.poppins,
                                fontSize: theme.typography.font_size.m,
                                fontWeight: theme.typography.font_weight.extra_light
                            }}   
                        >
                            Guest Can Pause: {guestCanPause ? 'Yes' : 'No'}
                            <IconButton
                                color='black'
                                aria-label={isEditingPause ? 'Save' : 'Edit'}
                                onClick={() => {isEditing ? handleSaveIconClick(target_param) : handleEditIconClick(target_param)}}>
                            {isEditingPause ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                        </Typography>
                    </div>

                )
            }
        }
        else {
            return(
                <div>Woops</div>
            )
        }
    }

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
                    paddingBottom: '5%'
                }}
                >
                Settings
                </Typography>

            </Grid>
            <Grid item xs={12} align='center'>
                <Collapse in={roomUpdated === true}>
                    <Typography
                        sx={{
                            fontFamily: theme.typography.font_style.sacramento,
                            fontWeight: theme.typography.font_weight.light,
                            fontSize: theme.typography.font_size.l,
                            color: 'black',
                            paddingTop: '2%',
                            paddingBottom: '2%'
                        }}
                    >
                    {updateMessage}
                    </Typography>
                </Collapse>
            </Grid>
            <Grid item xs={12} align='center'>
                <Card
                    variant="outlined"
                    align='center'
                    sx={{
                        backgroundColor: 'white',
                        fontFamily: theme.typography.font_style.poppins,
                        width: '40%',
                        paddingTop: '5%',
                        paddingBottom: '5%',
                    }}
                >
                    <FormControl>
                        <Grid container spacing={4}>
                            <Grid 
                                item xs={12} 
                                align='center'>
                                {renderEditableElement('TextField', 'string', 'roomName')}
                            </Grid>
                            <Grid item xs={12} align='center'>
                                {renderEditableElement('TextField', 'number', 'votesToSkip')}
                            </Grid>
                            <Grid item xs={12} align='center'>
                                {renderEditableElement('RadioGroup', 'boolean', 'guestCanPause')}
                            </Grid>
                            <Grid item xs={12} align='center'>
                                <Button 
                                    color='secondary' 
                                    variant='contained' 
                                    onClick={saveButtonPressed}
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
                                Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Card>
            </Grid>
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
                    onClick={backButtonPressed}
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
                    Back
                </Button>
            </Grid>
        </Grid> 
    </Box>
    );
}

export default RoomSettingsPage;

