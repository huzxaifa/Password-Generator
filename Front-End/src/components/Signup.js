import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { register } from '../Api'; // Ensure this import is correct
import './CustomStyles.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? "" : "Email is required.";
    tempErrors.password = password ? "" : "Password is required.";
    tempErrors.confirmPassword = confirmPassword ? "" : "Confirm Password is required.";
    if (password && confirmPassword && password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  

const handleSubmit = async (e) => {
  e.preventDefault();
  validate();
  // Use the validate function if necessary
  const validationResult = validate(password, confirmPassword);
  console.log("Validation Result:", validationResult);
  
  // Log the current state of the form fields
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);
  
  // Perform validation
  let errors = {};
  
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  
  if (!confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  
  // Log the errors object
  console.log("Vaidation Errors:", errors);
  
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
  
  // If no errors, proceed with form submission
  console.log("Form is valid, submitting...");
  // Add your form submission logic here

    try {
      // Call the register function to handle the signup process
      await register(email, password);
      localStorage.setItem('email', btoa(email)); // Encrypting for illustration
    localStorage.setItem('password', btoa(password)); // Encrypting for illustration
    console.log('Credentials saved to local storage:', { email: btoa(email), password: btoa(password) });

    console.log('Registration successful.');
  } catch (err) {
    console.error('Error during registration:', err);
  }
};
     

  return (
    <Container maxWidth="xs" className="container">
      <Typography variant="h4" component="h1" className="typography-header">Sign Up</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
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
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="textfield"
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="textfield"
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <Button type="submit" fullWidth className="button" sx={{ mt: 3 }}>
          Sign Up
        </Button>
      </Box>
      <Typography variant="body2" align="center" className="typography-subheader">
        Already have an account? <a href="/login" className="link">Login</a>
      </Typography>
    </Container>
  );
}

export default Signup;