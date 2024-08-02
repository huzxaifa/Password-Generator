// src/components/LogoutButton.js
import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
