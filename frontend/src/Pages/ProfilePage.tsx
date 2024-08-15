import React, { useState } from 'react';
import { Paper, Avatar, Typography, Button, TextField, Grid } from '@mui/material';

const UserProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper style={{ padding: '20px', textAlign: 'center', color: '#000', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', transition: '0.3s', borderRadius: '10px', width: '50%', display: 'flex', flexDirection: 'column' }} className="hover-effect">
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="profile-image-input" />
        <label htmlFor="profile-image-input">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Avatar alt="Profile Picture" src={selectedImage || profileImage || 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'} style={{ width: 100, height: 100, cursor: 'pointer' }} />
          </div>
        </label>
        <Typography variant="h5" gutterBottom>User Profile</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <TextField label="Name" defaultValue="John Doe" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" defaultValue="john@example.com" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Phone" defaultValue="+1234567890" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Address" defaultValue="123 Main St, City" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField type="password" label="Password" value={password} onChange={handlePasswordChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField type="password" label="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} fullWidth />
          </Grid>
        </Grid>
        <div style={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>Update</Button>
          <Button variant="contained" color="secondary">Cancel</Button>
        </div>
      </Paper>
    </div>
  );
};

export default UserProfilePage;

