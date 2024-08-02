import React, { useState } from 'react';
import { Container, Box, Typography, Card, CardContent, IconButton, Grid, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import './SavedPassword.css';

function SaveExport() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');
  
  const [records, setRecords] = useState([
    {
      site: 'flexstudent.nu.edu.pk',
      username: '221-1698',
      password: '********',
      website: 'https://flexstudent.nu.edu.pk/',
      note: 'Autosaved on flexstudent.nu.edu.pk',
      lastAutofill: 'Last Sunday at 2:05 PM',
      lastModified: '08 Jun 2024, 12:31',
      created: '08 Jun 2024, 12:31'
    },
    {
      site: 'slate.nu.edu.pk',
      username: 'i221698',
      password: '********',
      website: 'https://slate.nu.edu.pk/',
      note: 'Autosaved on slate.nu.edu.pk',
      lastAutofill: 'Last Sunday at 2:05 PM',
      lastModified: '08 Jun 2024, 12:31',
      created: '08 Jun 2024, 12:31'
    },
    {
      site: 'betterhelp.com',
      username: 'm.hproductions556@gmail.com',
      password: '********',
      website: 'https://betterhelp.com/',
      note: 'Autosaved on betterhelp.com',
      lastAutofill: 'Last Monday at 4:12 PM',
      lastModified: '10 Jun 2024, 15:20',
      created: '10 Jun 2024, 15:20'
    }
  ]);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setSite(records[selectedIndex].site);
    setUsername(records[selectedIndex].username);
    setPassword(records[selectedIndex].password);
    setNote(records[selectedIndex].note);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedRecords = [...records];
    updatedRecords[selectedIndex] = { ...updatedRecords[selectedIndex], site, username, password, note };
    setRecords(updatedRecords);
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" className="container">
      <Box className="content-box">
        <Box className="list-box">
          <Typography variant="h6" className="list-header">All Records</Typography>
          <List component="nav" className="record-list">
            {records.map((record, index) => (
              <ListItem
                button
                key={index}
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
                className="list-item"
              >
                <ListItemText
                  primary={record.site}
                  secondary={record.username}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box className="detail-box">
          {isEditing ? (
            <Box component="form" onSubmit={handleSave} noValidate>
              <Typography variant="h4" component="h1" className="detail-header">Edit Password</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Site"
                type="text"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="textfield"
                InputLabelProps={{ style: { color: '#ffffff' } }}
                sx={{ '& .MuiInputBase-root': { color: '#ffffff' } }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="textfield"
                InputLabelProps={{ style: { color: '#ffffff' } }}
                sx={{ '& .MuiInputBase-root': { color: '#ffffff' } }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="textfield"
                InputLabelProps={{ style: { color: '#ffffff' } }}
                sx={{ '& .MuiInputBase-root': { color: '#ffffff' } }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="textfield"
                InputLabelProps={{ style: { color: '#ffffff' } }}
                sx={{ '& .MuiInputBase-root': { color: '#ffffff' } }}
              />
              <Button type="submit" fullWidth className="button" sx={{ mt: 3, backgroundColor: '#0077b6', color: '#fff' }}>
                Save Changes
              </Button>
            </Box>
          ) : (
            <Card className="detail-card">
              <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h5" className="site-title">{records[selectedIndex].site}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton className="icon-button" onClick={handleEditClick}><EditIcon /></IconButton>
                    <IconButton className="icon-button"><PeopleIcon /></IconButton>
                  </Grid>
                </Grid>
                <Typography variant="body2" className="field-title">Username</Typography>
                <Typography variant="body1" className="field-value">{records[selectedIndex].username}</Typography>
                <Typography variant="body2" className="field-title">Password</Typography>
                <Box display="flex" alignItems="center" justifyContent="flex-start" paddingLeft="10px">
                  <Typography variant="body1" className="field-value"  style={{ paddingLeft: '200px' }}>{records[selectedIndex].password}</Typography>
                  <IconButton className="icon-button"><VisibilityIcon /></IconButton>
                  <IconButton className="icon-button"><CloseIcon /></IconButton>
                </Box>
                <Typography variant="body2" className="field-title">Website</Typography>
                <Typography variant="body1">
                  <a href={records[selectedIndex].website} target="_blank" rel="noopener noreferrer" className="link">{records[selectedIndex].website}</a>
                </Typography>
                <Typography variant="body2" className="field-title">Note</Typography>
                <Typography variant="body1" className="field-value">{records[selectedIndex].note}</Typography>
                <Box mt={2}>
                  <Typography variant="body2" className="field-title">Last autofill</Typography>
                  <Typography variant="body1" className="field-value">{records[selectedIndex].lastAutofill}</Typography>
                  <Typography variant="body2" className="field-title">Last modified</Typography>
                  <Typography variant="body1" className="field-value">{records[selectedIndex].lastModified}</Typography>
                  <Typography variant="body2" className="field-title">Created</Typography>
                  <Typography variant="body1" className="field-value">{records[selectedIndex].created}</Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default SaveExport;
