import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const Track = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);  // Store watchId

  const startTracking = () => {
    console.log("Start Tracking button clicked");

    // Set tracking state to true first, ensuring the UI updates immediately
    setIsTracking(true);  
    
    // Start watching the user's position
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // Send the location data to the server
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
        timeout: 10000 
      }
    );

    setWatchId(id);  // Store watchId for later cleanup
  };

  useEffect(() => {
    console.log("Component mounted or updated, isTracking:", isTracking);
    // Cleanup the watchId on component unmount
    return () => {
      if (watchId) {
        console.log("Cleaning up watchId:", watchId);
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId, isTracking]);  // Track both watchId and isTracking

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: '#4CAF50' }}>Tracking Your Location</h1>
      {!isTracking ? (
        <button
          onClick={startTracking}
          style={{
            display: 'block', 
            margin: '20px auto', 
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: '#007BFF', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          Start Tracking
        </button>
      ) : (
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#FF6347' }}>Tracking in progress...</p>
      )}
    </div>
  );
};

export default Track;
