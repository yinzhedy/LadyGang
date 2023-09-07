import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RoomPage() {
  const { roomCode } = useParams();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomName, setRoomName] = useState(roomCode)

  // Use the useEffect hook to simulate componentDidMount behavior
  useEffect(() => {
    fetch(`/api/get-room/${roomCode}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data) {
          // grab first room in array
          setVotesToSkip(data.votes_to_skip);
          setGuestCanPause(data.guest_can_pause);
          setIsHost(data.is_host);
        } else {
          // Handle the case when there are no rooms with the given code
          setRoomName('No Room Found')
          setVotesToSkip('No data');
          setGuestCanPause('No data');
          setIsHost(false)
          console.log('No room data found');
        }
      });
  }, [roomCode]);

  return (
    <div>
      <h3>{roomName}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause ? 'Yes' : 'No'}</p>
      <p>Host: {isHost ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default RoomPage;





