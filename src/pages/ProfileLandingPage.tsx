import * as React from 'react';
import { Button, PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppAppBar from './AppBarProfile';
import UserProfile from './MyProfile';
import MyProfileDetails from './MyProfileDetails';
import PhotoUpload from './PhotoUpload';


export default function LandingPage2() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const [profileData, setProfileData] = React.useState({
    firstName: 'Amelia',
    lastName: 'Harper',
    department: 'UI/UX',
    position: 'Designer',
    phone: '+1(213)555-4276',
    email: 'ameliah@dx-email.com',
    country: 'USA',
    specialization:'ameliah@dx-email.com',
    experience:'',
    city: 'New York',
    state: 'New York',
    address: '405 E 42nd St',
    zipCode: '90014',
    height: '170',
    weight: '70',
    profilePicture: '/static/images/avatar/1.jpg',
    bio : ''
  });

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };


  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Make API call to save data
    console.log('Saved data:', profileData);
    setEditMode(false);
    alert('Saved!');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar
        mode={mode}
        toggleColorMode={toggleColorMode}
        profilePicture={profileData.profilePicture}
      />
      <Box sx={{ position: 'relative', bgcolor: 'background.default', p: 3, minHeight: '100vh' }}>
        <Box sx={{ position: 'absolute', top: 16, right: 12, zIndex: 1, mt: 10}}>
          {editMode ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" sx={{ ml: 2 }} onClick={handleEditModeToggle}>
                Quit
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEditModeToggle}>
              Edit
            </Button>
          )}
        </Box>
        <UserProfile
          profileData={profileData}
          editMode={editMode}
          onInputChange={handleInputChange}
          onProfilePictureChange={handleProfilePictureChange}
        />
        <Divider sx={{ my: 4 }} />
        <MyProfileDetails
          profileData={profileData}
          editMode={editMode}
          onInputChange={handleInputChange}
        />
        <PhotoUpload
        />
      </Box>
    </ThemeProvider>
  );
}
