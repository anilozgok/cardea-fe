import React, { useEffect } from 'react';
import axios from 'axios';
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
    firstName: '',
    lastName: '',
    department: '',
    position: '',
    phone: '',
    email: '',
    country: '',
    specialization: '',
    experience: '',
    city: '',
    state: '',
    address: '',
    zipCode: '',
    height: '',
    weight: '',
    profilePicture: '',
    bio: ''
  });

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const userId = "user_id"; // Bu değeri doğru kullanıcı ID'si ile değiştirmelisiniz

  useEffect(() => {
    // Backend'den profil verilerini almak için useEffect kullanın
    axios.get(`/profile/${userId}`) // Profil verilerini almak için API endpoint'iniz
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error('Profil verilerini alırken hata oluştu:', error);
      });
  }, [userId]);

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
      const formData = new FormData();
      formData.append('photo', file);

      axios.post(`/profile/${userId}/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: response.data.photoUrl,
        }));
      })
      .catch(error => {
        console.error('Fotoğraf yüklenirken hata oluştu:', error);
      });
    }
  };

  const handleSave = () => {
    // Profil verilerini kaydetmek için backend'e POST/PUT isteği gönderin
    axios.put('/profile', profileData) // Profil verilerini kaydetmek için API endpoint'iniz
      .then(response => {
        console.log('Veriler kaydedildi:', response.data);
        setEditMode(false);
        alert('Profil başarıyla kaydedildi!');
      })
      .catch(error => {
        console.error('Verileri kaydederken hata oluştu:', error);
      });
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
        <Box sx={{ position: 'absolute', top: 16, right: 12, zIndex: 1, mt: 10 }}>
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
        <PhotoUpload />
      </Box>
    </ThemeProvider>
  );
}
