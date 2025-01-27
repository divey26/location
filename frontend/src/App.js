import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Track from './components/Track';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/track" element={<Track />} />
        <Route path="/" element={
          <div>
            <h1>Welcome to Employee Tracking App</h1>
            <a href="http://localhost:5000/auth/google">Login with Google</a>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
