import React, { useState } from 'react';
import { Container, Box, Typography, Button, Slider, Switch, FormControlLabel } from '@mui/material';
import './CustomStyles.css';
function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    // Placeholder password generation logic
    let newPassword = 'GeneratedPassword123!'; // Replace with actual logic
    setGeneratedPassword(newPassword);
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" component="h1" gutterBottom className="typography-header">Password Generator</Typography>
      <Box sx={{ mt: 4 }}>
        <Typography gutterBottom className="typography-subheader">Password Length: {length}</Typography>
        <Slider
          value={length}
          onChange={(e, newValue) => setLength(newValue)}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={8}
          max={32}
          className="slider"
        />
        <FormControlLabel
          control={<Switch checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />}
          label="Include Symbols (!*&)"
          className="switch"
        />
        <FormControlLabel
          control={<Switch checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />}
          label="Include Numbers (0-9)"
          className="switch"
        />
        <FormControlLabel
          control={<Switch checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />}
          label="Include Uppercase (A-Z)"
          className="switch"
        />
        <Button variant="contained" color="primary" className="button" onClick={generatePassword}>
          Generate Password
        </Button>
        {generatedPassword && (
          <Box sx={{ mt: 2, p: 2 }} className="box">
            <Typography variant="h6" className="typography-header">Generated Password:</Typography>
            <Typography variant="body1" className="typography-subheader">{generatedPassword}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default PasswordGenerator;
