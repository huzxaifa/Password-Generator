// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './components/Home';
import Login from './components/Login';
import PasswordGenerator from './components/PasswordGenerator';
import SaveExport1 from './components/saveExport';
import Signup from './components/Signup';

import './App.css';

function App() {
  return (
    <Box className="App" sx={{ textAlign: 'center', padding: '2rem' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/save-export" element={<SaveExport1 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* Add more routes as needed */}
      </Routes>
    </Box>
  );
}

export default App;