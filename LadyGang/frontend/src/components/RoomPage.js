import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RoomPage() {
  const { roomCode } = useParams();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  // Use the useEffect hook to simulate componentDidMount behavior
  useEffect(() => {
    fetch(`/api/room/${roomCode}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          // Assuming you are interested in the first object in the array
          const firstRoom = data[0];
          console.log(firstRoom)
          setVotesToSkip(firstRoom.votes_to_skip);
          setGuestCanPause(firstRoom.guest_can_pause);
          setIsHost(firstRoom.isHost);
        } else {
          // Handle the case when there are no rooms with the given code
          console.log('No room data found');
        }
      });
  }, [roomCode]);

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>Guest Can Pause: {guestCanPause ? 'Yes' : 'No'}</p>
      <p>Host: {isHost ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default RoomPage;





