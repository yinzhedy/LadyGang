import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RoomPage() {
  const { roomCode } = useParams();
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  // Use the useEffect hook to simulate componentDidMount behavior
  useEffect(() => {
    // Fetch and update the component's state based on 'roomCode' or any other data
    // Example API request:
    fetch(`/api/rooms/${roomCode}`)
      .then(response => response.json())
      .then(data => {
        setVotesToSkip(data.votesToSkip);
        setGuestCanPause(data.guestCanPause);
        setIsHost(data.isHost);
      });

  }, [roomCode]); // Run this effect whenever 'roomCode' changes

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





