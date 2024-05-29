import React, { useEffect, useState } from 'react';
import logo from '../assets/CardeaLogo.png';
import { Container, Grid, TextField, Typography, Avatar, Box, MenuItem, AppBar, Button, Toolbar } from '@mui/material';
import axios from 'axios';
import { useUser } from '../context/UserContext';

interface UserProfileProps {
  firstName: string;
  lastName: string;
  specializations: string;
  experience: string;
  profilePicture: string;
  bio: string;
  height: number;
  weight: number;
  phone: string;
  email: string;
  country: string;
  city: string;
  state: string;
  address: string;
  zipCode: string;
}

export default function UserProfiles() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { user } = useUser();
  const [profileData, setProfileData] = useState<UserProfileProps>({
    firstName: '',
    lastName: '',
    specializations: '',
    experience: '',
    profilePicture: '',
    bio: '',
    height: 0,
    weight: 0,
    phone: '',
    email: '',
    country: '',
    city: '',
    state: '',
    address: '',
    zipCode: ''
  });

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: name === 'height' || name === 'weight' ? Number(value) : value,
    });
  };

  const handleSave = () => {
    axios.post('http://localhost:8080/api/v1/profile', profileData, { withCredentials: true })
      .then(response => {
        console.log('Veriler kaydedildi:', response.data);
        setEditMode(false);
        alert('Profil başarıyla kaydedildi!');
      })
      .catch(error => {
        console.error('Verileri kaydederken hata oluştu:', error);
      });
  };

  const [, setOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/profile', { withCredentials: true });
        if (response.status === 200) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.log("No profile data found. Redirecting to setup profile.");
        try {
          const response = await axios.get('http://localhost:8080/api/v1/user/get-user-info', { withCredentials: true });
          if (response.status === 200) {
            setProfileData({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              specializations: '',
              experience: '',
              profilePicture: '',
              bio: '',
              height: 0,
              weight: 0,
              phone: '',
              email: response.data.email,
              country: '',
              city: '',
              state: '',
              address: '',
              zipCode: ''
            });
          }
          setEditMode(true);
        } catch (innerError) {
          console.error("Error fetching user data: ", innerError);
        }
      }
    };
  
    fetchProfileData();
  }, []);
  return (
    <>
      <div>
        <AppBar
          position="fixed"
          sx={{
            boxShadow: 0,
            bgcolor: 'transparent',
            backgroundImage: 'none',
            mt: 2,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              variant="regular"
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderRadius: '999px',
                bgcolor:
                  theme.palette.mode === 'light'
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(24px)',
                maxHeight: 56,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow:
                  theme.palette.mode === 'light'
                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
              })}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  ml: '-18px',
                  px: 0,
                }}
              >
                <img
                  src={logo}
                  alt="logo of Cardea"
                  style={{ width: 80, height: 80, borderRadius: '50%' }}
                />
                <Box sx={{ display: 'flex', ml: 3 }}>
                  <MenuItem
                    onClick={() => scrollToSection('generalInfo')}
                    sx={{ py: '6px', px: '16px' }}
                  >
                    <Typography variant="body1" color="text.primary">
                      General Info
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection('myDetails')}
                    sx={{ py: '6px', px: '16px' }}
                  >
                    <Typography variant="body1" color="text.primary">
                      Physical Details
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => scrollToSection('photoUpload')}
                    sx={{ py: '6px', px: '16px' }}
                  >
                    <Typography variant="body1" color="text.primary">
                      Photo Upload
                    </Typography>
                  </MenuItem>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                {editMode ? (
                  <>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      Save Changes
                    </Button>
                    <Button variant="outlined" sx={{ ml: 2 }} onClick={handleEditModeToggle}>
                      Quit
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleEditModeToggle}>
                    Edit Profile
                  </Button>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="outlined" sx={{ mr: 2 }}>
                  Change Password
                </Button>
                <Avatar sx={{ width: 40, height: 40, mr: 2 }} />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>

      <Container id="generalInfo">
        <Box sx={{ mt: 10, p: 3 }}>
          <Typography variant="h4" gutterBottom style={{ color: 'black' }}>User Profile</Typography>
          <Box display="flex" alignItems="center" justifyContent={"center"} mb={3}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-picture-input"
              type="file"
              disabled={!editMode}
              onChange={(e) => handleInputChange({ target: { name: 'profilePicture', value: e.target.files ? URL.createObjectURL(e.target.files[0]) : profileData.profilePicture } })}
            />
            <label htmlFor="profile-picture-input">
              <Avatar
                src={profileData.profilePicture}
                sx={{ width: 80, height: 80, mr: 2 }} />
            </label>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialization"
                    variant="outlined"
                    name="specializations"
                    value={profileData.specializations}
                    onChange={handleInputChange}
                    select
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }}
                  >
                    <MenuItem value="Lose Weight">Lose Weight</MenuItem>
                    <MenuItem value="Gain Weight">Gain Weight</MenuItem>
                    <MenuItem value="Compete Professionally">Compete Professionally</MenuItem>
                    <MenuItem value="Increase Muscle Mass">Increase Muscle Mass</MenuItem>
                    <MenuItem value="Improve Endurance">Improve Endurance</MenuItem>
                    <MenuItem value="Improve Flexibility">Improve Flexibility</MenuItem>
                    <MenuItem value="Rehabilitation and Recovery">Rehabilitation and Recovery</MenuItem>
                    <MenuItem value="Improve Cardio Fitness">Improve Cardio Fitness</MenuItem>
                    <MenuItem value="Strength Training">Strength Training</MenuItem>
                    <MenuItem value="Functional Training">Functional Training</MenuItem>
                    <MenuItem value="Sports-Specific Training">Sports-Specific Training</MenuItem>
                    <MenuItem value="Bodybuilding">Bodybuilding</MenuItem>
                    <MenuItem value="CrossFit">CrossFit</MenuItem>
                    <MenuItem value="High-Intensity Interval Training (HIIT)">High-Intensity Interval Training (HIIT)</MenuItem>
                    <MenuItem value="Yoga and Mindfulness">Yoga and Mindfulness</MenuItem>
                    <MenuItem value="Pilates">Pilates</MenuItem>
                    <MenuItem value="Martial Arts Training">Martial Arts Training</MenuItem>
                    <MenuItem value="Core Strengthening">Core Strengthening</MenuItem>
                    <MenuItem value="Balance and Stability">Balance and Stability</MenuItem>
                    <MenuItem value="Senior Fitness Programs">Senior Fitness Programs</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Experience"
                    variant="outlined"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    label="Biography"
                    variant="outlined"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 4 }} style={{ color: 'black' }}>Contacts</Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 4 }} style={{ color: 'black' }}>Address</Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    variant="outlined"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State/Province/Area"
                    variant="outlined"
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    variant="outlined"
                    name="zipCode"
                    value={profileData.zipCode}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    InputProps={{ readOnly: !editMode }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', mb: 3 }} />
      </Container>
      <Container id="myDetails">
        <Box sx={{ mt: 1, p: 3 }}>
          <Typography variant="h6" gutterBottom style={{ color: 'black' }}>Physical Details</Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Height (cm)"
                variant="outlined"
                name="height"
                value={profileData.height}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                variant="outlined"
                name="weight"
                value={profileData.weight}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ borderBottom: '1px solid #ccc', mb: 3 }} />
      </Container>
    </>
  );
}
