// src/components/Home.js
import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Welcome</Typography>
      <Box sx={{ mt: 4 }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" sx={{ mb: 2, width: '100%' }}>
            Login
          </Button>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="secondary" sx={{ mb: 2, width: '100%' }}>
            Sign Up
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default Home;
