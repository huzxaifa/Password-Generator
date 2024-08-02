import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import './CustomStyles.css';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const decrypt = (data) => {
    // Dummy decryption function for illustration
    return atob(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Load credentials from local storage
      const storedEmail = localStorage.getItem('email');
      const storedPassword = localStorage.getItem('password');
      console.log('Loaded credentials from local storage:', { storedEmail, storedPassword });

      if (!storedEmail || !storedPassword) {
        console.error('No credentials found in local storage.');
        setError('No credentials found. Please register first.');
        return;
      }

      // Decrypt the stored credentials
      const decryptedEmail = decrypt(storedEmail);
      const decryptedPassword = decrypt(storedPassword);
      console.log('Decrypted credentials:', { decryptedEmail, decryptedPassword });

      // Compare decrypted credentials with user-entered data
      if (email === decryptedEmail && password === decryptedPassword) {
        console.log('Credentials match. Proceeding with login...');
        await login(email, password);
      } else {
        console.log('Credentials do not match.');
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError(err.message || 'An error occurred during login');
    }
  };

  return (
    <Container maxWidth="xs" className="container">
      <Typography variant="h4" component="h1" className="typography-header">Login</Typography>
      <Box component="form" onSubmit={handleLogin} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email Address"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="textfield"
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="textfield"
          InputLabelProps={{ style: { color: '#fff' } }}
        />
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Button type="submit" fullWidth className="button" sx={{ mt: 3 }}>
          Login
        </Button>
      </Box>
      <Typography variant="body2" align="center" className="typography-subheader">
        Don't have an account? <a href="/signup" className="link">Sign up</a>
      </Typography>
    </Container>
  );
}

export default Login;