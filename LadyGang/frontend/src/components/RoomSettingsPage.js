import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {Grid, Button, IconButton, Typography, TextField, FormControl, FormControlLabel, RadioGroup, Radio} from '@mui/material'
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
    const navigate = useNavigate();

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
            console.log('Request Options:', requestOptions)
            fetch('/api/update-room', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                navigate('/music/room/' + data.code);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    function backButtonPressed() {
        navigate('/music/room/'+ roomCode)
        return
    }

    //Editable Typography Code
    function handleSaveIconClick(target) {
        console.log(isEditing)
        console.log(isEditingName)
        console.log(isEditingPause)
        console.log(isEditingVotes)
        console.log(target)
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
        console.log(isEditing)
        console.log(isEditingName)
        console.log(isEditingPause)
        console.log(isEditingVotes)
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
                            align='center'>
                                Room Name:
                            </Typography>
                            <TextField
                                value={roomName}
                                type={type_param}
                                autoFocus={isEditing}
                                onChange={handleChange}
                            />
                            <IconButton
                                color="primary"
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
                            align='center'>
                            Room Name:
                        </Typography>
                        <Typography
                            align='center'>
                            {roomName}
                            <IconButton
                                color="primary"
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
                        align='center'>
                            Votes to Skip:
                        </Typography>
                        <TextField
                            value={votesToSkip}
                            type={type_param}
                            autoFocus={isEditing}
                            onChange={handleChange}
                        />
                        <IconButton
                            color="primary"
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
                            align='center'>
                            Votes to Skip:
                        </Typography>
                        <Typography
                            align='center'>
                            {votesToSkip}
                            <IconButton
                                color="primary"
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
                        <Typography align='center'>
                            Guest Can Pause:
                        </Typography>
                        <RadioGroup
                            row
                            defaultValue="true"
                            onChange={handleChange}>
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
                        <IconButton
                        color="primary"
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
                        <Typography align='center'>
                            Guest Can Pause: {guestCanPause ? 'Yes' : 'No'}
                            <IconButton
                                color="primary"
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
    <React.Fragment>
        <FormControl>
        <Grid container spacing={1}>
            <Grid item xs={12} align='center'>
                {renderEditableElement('TextField', 'string', 'roomName')}
            </Grid>
            <Grid item xs={12} align='center'>
                {renderEditableElement('TextField', 'number', 'votesToSkip')}
            </Grid>
            <Grid item xs={12} align='center'>
                {renderEditableElement('RadioGroup', 'boolean', 'guestCanPause')}
            </Grid>

            <Grid item xs={12} align='center'>
                <Button color='secondary' variant='contained' onClick={saveButtonPressed}>
                    Save Changes
                </Button>
            </Grid>
            <Grid item xs={12} align='center'>
                <Button color='secondary' variant='contained' onClick={backButtonPressed}>
                    Back
                </Button>
            </Grid>
        </Grid>
        </FormControl>
    </React.Fragment>
    );
}

export default RoomSettingsPage;

