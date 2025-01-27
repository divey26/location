import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Track from './components/Track';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/track" element={<Track />} />
        <Route path="/" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
           <h1>LOTRACK</h1>

            <h1>Welcome to Employee Tracking App</h1>
            <p>Login to track your location</p>
            <a 
              href="http://localhost:5000/auth/google" 
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '16px',
              }}
            >
              Login with Google
            </a>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
