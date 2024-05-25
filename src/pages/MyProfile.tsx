import React from 'react';
import { Container, Grid, TextField, Typography, Avatar, Box, MenuItem } from '@mui/material';

interface UserProfileProps {
  profileData: {
    firstName: string;
    lastName: string;
    specialization: string;
    experience: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    state: string;
    address: string;
    zipCode: string;
    profilePicture: string;
    bio: string;
  };
  editMode: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfilePictureChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ profileData, editMode, onInputChange, onProfilePictureChange }) => {
  const {
    firstName,
    lastName,
    specialization,
    experience,
    phone,
    email,
    country,
    city,
    state,
    address,
    zipCode,
    profilePicture,
    bio
  } = profileData;

  return (
    <Container id="generalInfo">
      <Box sx={{ mt: 10, p: 3 }}>
        <Typography variant="h4" gutterBottom>User Profile</Typography>
        <Box display="flex" alignItems="center" justifyContent={"center"} mb={3}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-picture-input"
            type="file"
            onChange={onProfilePictureChange}
            disabled={!editMode}
          />
          <label htmlFor="profile-picture-input">
            <Avatar
              src={profilePicture}
              sx={{ width: 80, height: 80, mr: 2, cursor: editMode ? 'pointer' : 'default' }}
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
                  value={firstName}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Specialization"
                  variant="outlined"
                  name="specialization"
                  value={specialization}
                  onChange={onInputChange}
                  defaultValue={"Strength Training"}
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
                  placeholder='Your experiences on the field'
                  value={experience}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Biography"
                  variant="outlined"
                  name="bio"
                  multiline
                  rows={3}
                  placeholder='Biography'
                  value={bio}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 4 }}>Contacts</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  name="phone"
                  value={phone}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 4 }}>Address</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  name="country"
                  value={country}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  name="city"
                  value={city}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State/Province/Area"
                  variant="outlined"
                  name="state"
                  value={state}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={address}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Zip Code"
                  variant="outlined"
                  name="zipCode"
                  value={zipCode}
                  onChange={onInputChange}
                  sx={{ mb: 2 }}
                  InputProps={{ readOnly: !editMode }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default UserProfile;
