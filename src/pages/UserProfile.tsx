import React, { useEffect, useState } from 'react';
import logo from '../assets/CardeaLogo.png';
import { Container, Grid, TextField, Typography, Avatar, Box, MenuItem, AppBar, Button, Toolbar } from '@mui/material';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface UserProfileProps {
  firstName: string;
  lastName: string;
  specialization: string;
  experience: string;
  profilePicture: string;
  bio: string;
  height: number;
  weight: number;
  phone: string;
  country: string;
  city: string;
  stateProvince: string;
  address: string;
  zipCode: string;
}

export default function UserProfiles() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { user } = useUser();
  const [profileData, setProfileData] = useState<UserProfileProps>({
    firstName: '',
    lastName: '',
    specialization: '',
    experience: '',
    profilePicture: '',
    bio: '',
    height: 0,
    weight: 0,
    phone: '',
    country: '',
    city: '',
    stateProvince: '',
    address: '',
    zipCode: ''
  });
  const [originalProfileData, setOriginalProfileData] = useState<UserProfileProps>(profileData);
 
  const navigate = useNavigate()


 
  const handleEditModeToggle = () => {
    if (editMode) {
      setProfileData(originalProfileData);
    } else {
      setOriginalProfileData(profileData);
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: name === 'height' || name === 'weight' ? Number(value) : value,
    });
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
      navigate('/'); // Redirect to the landing page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const handleNavigate = (operation:string) => {
    var url = '';
    const isCoach = user.role === 'coach';
    switch(operation){
        case 'workout':
            url = isCoach ? '/exercise' : '/workouts'
            break;
        case 'diet':
            url = isCoach ? '/diet-plan' : '/diet-plan-user' 
            break;
        case 'photo':
            url = isCoach ? '/athlete-photos' : '/upload-photos' 
            break;    
    }
    navigate(url)
}



  const handleSave = () => {
    const apiUrl = 'http://localhost:8080/api/v1/profile';
    const method = isProfileNew ? axios.post : axios.put;

    method(apiUrl, profileData, { withCredentials: true })
      .then(response => {
        console.log('Profile saved:', response.data);
        setIsProfileNew(false);
        setEditMode(false);
        alert('Profile successfully saved!');
      })
      .catch(error => {
        console.error('Error saving profile:', error);
      });
  };
  const [isProfileNew, setIsProfileNew] = useState<boolean>(true);
  const [, setOpen] = useState(false);



  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/profile', { withCredentials: true });
        if (response.status === 200 && response.data) {
          setProfileData(response.data);
          setOriginalProfileData(response.data);
          setIsProfileNew(false); 
        }
      } catch (error) {
        console.error("No profile data found. Attempting to fetch minimal user data.");
        setIsProfileNew(true);
        try {
          const userResponse = await axios.get('http://localhost:8080/api/v1/user/get-user-info', { withCredentials: true });
          if (userResponse.status === 200) {
            const userData = {
              firstName: userResponse.data.firstName,
              lastName: userResponse.data.lastName,
              specialization: '',
              experience: '',
              profilePicture: '',
              bio: '',
              height: 0,
              weight: 0,
              phone: '',
              country: '',
              city: '',
              stateProvince: '',
              address: '',
              zipCode: ''
            };
            setProfileData(userData);
            setOriginalProfileData(userData);
          }
        } catch (innerError) {
          console.error("Error fetching minimal user data: ", innerError);
        }
      }
    };

    fetchProfileData();
  }, []);




  return (
    <>
      <div>
        <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}>
          <Container maxWidth="lg">
            <Toolbar variant="regular" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '999px', bgcolor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(24px)', maxHeight: 56, border: '1px solid', borderColor: 'divider', padding: '0 24px' }}>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="logo of Cardea" style={{ width: 80, height: 80, borderRadius: '50%' }} />
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', ml: 4 }}>
                  <MenuItem onClick={() => navigate('/landing')}>
                    <Typography variant="body1" color="text.primary">Home</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('workout')}>
                    <Typography variant="body1" color="text.primary">Workouts</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('diet')}>
                    <Typography variant="body1" color="text.primary">Diet Plans</Typography>
                  </MenuItem>

                  <MenuItem onClick={() => handleNavigate('photo')}>
                    <Typography variant="body1" color="text.primary">Body Transformation</Typography>
                  </MenuItem>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
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
                        Edit Mode
                      </Button>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate('/update-password')}>
                    Change Password
                  </Button>
                  <Avatar src={profileData.profilePicture} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                </Box>
                <Button
                    onClick={handleLogout}
                    startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft:'20px'}} />} // You can adjust the size here
                >
                </Button>
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
                    name="specialization"
                    value={profileData.specialization || ''}
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
                    value={user.email || ''}
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
                    name="stateProvince"
                    value={profileData.stateProvince}
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
