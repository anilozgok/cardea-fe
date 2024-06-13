import React, { useEffect, useState } from 'react';
import logo from '../assets/CardeaLogo.png';
import {
  Container, Grid, TextField, Typography, Avatar, Box, MenuItem, AppBar, Button, Toolbar
} from '@mui/material';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import profileBg from '../assets/profileBg.png';
import { ToastContainer, toast } from 'react-toastify';

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
  const { user } = useUser() as { user: { email: string, role: string } };
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
  const [isProfileNew, setIsProfileNew] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = `url(${profileBg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundRepeat = 'no-repeat';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundAttachment = '';
      document.body.style.backgroundRepeat = '';
    };
  }, []);

  const handleEditModeToggle = () => {
    if (editMode) {
      setProfileData(originalProfileData);
    } else {
      setOriginalProfileData(profileData);
    }
    setEditMode(!editMode);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number(value);

    let valid = true;

    if (name === 'height') {
      if (numValue < 50 || numValue > 300 || isNaN(numValue)) {
        valid = false;
        toast.error('Height must be between 50 cm and 300 cm.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else if (name === 'weight') {
      if (numValue < 10 || numValue > 500 || isNaN(numValue)) {
        valid = false;
        toast.error('Weight must be between 10 kg and 500 kg.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

    setIsValid(valid);
    setProfileData(prevData => ({
      ...prevData,
      [name]: valid ? numValue : prevData[name]  // revert if not valid
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: name === 'height' || name === 'weight' ? Number(value) : value
    }));
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://34.116.133.84:8080/api/v1/auth/logout', {}, { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNavigate = (operation: string) => {
    const isCoach = user.role === 'coach';
    let url = '';
    switch (operation) {
      case 'workout':
        url = isCoach ? '/exercise' : '/workouts';
        break;
      case 'diet':
        url = isCoach ? '/diet-plan' : '/diet-plan-user';
        break;
      case 'photo':
        url = isCoach ? '/athlete-photos' : '/upload-photos';
        break;
      default:
        url = '/';
    }
    navigate(url);
  };

  const handleSave = () => {
    if (!profileData.height || !profileData.weight || !profileData.specialization || !profileData.experience || !profileData.phone) {
      toast.error('All required fields must be filled out.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const apiUrl = 'http://34.116.133.84:8080/api/v1/profile';
    const method = isProfileNew ? axios.post : axios.put;

    const inputElement = document.getElementById('profile-picture-input') as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files[0]) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('image', file, file.name);

      const apiPictureUrl = 'http://34.116.133.84:8080/api/v1/profile/upload-photo?is_pp=true';
      fetch(apiPictureUrl, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text(); // parse as text
        })
        .then(data => {
          if (typeof data === 'string' && data.startsWith('./')) {
            const newProfilePictureUrl = `http://34.116.133.84:8080${data.substring(1)}`;
            setProfileData(prevData => ({
              ...prevData,
              profilePicture: newProfilePictureUrl
            }));
            updateProfileData(newProfilePictureUrl);
          }
        })
        .catch(error => {
          console.error('Error during photo upload:', error);
          notifyError();
        });
    } else {
      updateProfileData(profileData.profilePicture);
    }

    function updateProfileData(newProfilePictureUrl: string) {
      const updatedProfileData = {
        ...profileData,
        profilePicture: newProfilePictureUrl
      };

      method(apiUrl, updatedProfileData, { withCredentials: true })
        .then(response => {
          console.log('Profile saved:', response.data);
          setIsProfileNew(false);
          setEditMode(false);
          notify();
        })
        .catch(error => {
          console.error('Error during profile update:', error);
          notifyError();
        });
    }
  };

  const notify = () => toast.success('Successfully Saved', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyError = () => toast.error('Error while saving changes', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://34.116.133.84:8080/api/v1/profile', { withCredentials: true });
        if (response.status === 200 && response.data) {
          setProfileData(response.data);
          setOriginalProfileData(response.data);
          setIsProfileNew(false);
        }
      } catch (error) {
        console.error("No profile data found. Attempting to fetch minimal user data.");
        setIsProfileNew(true);
        try {
          const userResponse = await axios.get('http://34.116.133.84:8080/api/v1/user/get-user-info', { withCredentials: true });
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
  const toastInfo = (toastMethod: string, messageToShow: string) => {
    const method = toastMethod === 'error' ? toast.error : toast.success;

    method(messageToShow, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  function capitalizeFirstLetter(string: string): string {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


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
                      <Button variant="contained" color="primary" onClick={handleSave} disabled={!isValid || !profileData.height || !profileData.weight || !profileData.specialization || !profileData.experience || !profileData.phone}>
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
                  startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft: '20px' }} />}
                >
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>

      <Container id="generalInfo">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Box sx={{ mt: 10, p: 3 }}>
          <Typography variant="h4" gutterBottom style={{ color: 'black' }}>User Profile</Typography>
          <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-picture-input"
              type="file"
              disabled={!editMode}
              onChange={(e) => handleInputChange({
                target: {
                  name: 'profilePicture',
                  value: e.target.files ? URL.createObjectURL(e.target.files[0]) : profileData.profilePicture
                }
              } as React.ChangeEvent<HTMLInputElement>)}
            />
            <label htmlFor="profile-picture-input">
              <Avatar
                src={profileData.profilePicture}  // Fallback to logo if no profile picture
                sx={{ width: 80, height: 80, mr: 2, cursor: editMode ? 'pointer' : 'default' }}
                style={{ border: editMode ? '2px dashed #ccc' : '' }}
              />
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
                    required
                    label="Specialization"
                    variant="outlined"
                    name="specialization"
                    value={profileData.specialization || ''}
                    error={!profileData.specialization}
                    helperText={!profileData.specialization ? "Specialization is required" : " "}
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
                    required
                    label="Experience"
                    variant="outlined"
                    name="experience"
                    value={profileData.experience}
                    error={!profileData.experience}
                    helperText={!profileData.experience ? "Experience is required" : " "}
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
                    required
                    label="Phone"
                    variant="outlined"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    error={!profileData.phone}
                    helperText={!profileData.phone ? "Phone is required" : " "}
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
                required
                label="Height (cm)"
                variant="outlined"
                name="height"
                value={profileData.height || ''}
                onBlur={handleBlur}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                error={!profileData.height}
                helperText={!profileData.height ? "Height is required" : " "}
                InputProps={{ readOnly: !editMode }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Weight (kg)"
                variant="outlined"
                name="weight"
                value={profileData.weight}
                onBlur={handleBlur}
                onChange={handleInputChange}
                error={!profileData.weight}
                helperText={!profileData.weight ? "Weight is required" : " "}
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
