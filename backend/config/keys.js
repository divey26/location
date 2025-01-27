import React, { useState } from 'react'; 
import axios from 'axios';

const Track = () => {
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = () => {
    setIsTracking(true);
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Send the location data to the server with credentials (cookies)
        axios.post('http://localhost:5000/auth/track-location', {
          latitude,
          longitude
        }, {
          withCredentials: true  // Ensure credentials like cookies are sent
        })
        .then(response => {
          console.log('Location sent successfully');
        })
        .catch(error => {
          console.error('Error sending location', error);
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { 
        enableHighAccuracy: true, 
        maximumAge: 10000, 
        timeout: 5000 
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
    };
  };

  return (
    <div>
      ejkrblewihgn
      <h1>Tracking Yefour Location</h1>
      {!isTracking && <button onClick={startTracking}>Start Tracking</button>}
    </div>
  );
};

export default Track;
