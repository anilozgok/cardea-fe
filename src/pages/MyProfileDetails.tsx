import React from 'react';
import { Container, Grid, TextField, Typography, Box } from '@mui/material';

interface MyProfileDetailsProps {
  profileData: {
    height: string;
    weight: string;
  };
  editMode: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyProfileDetails: React.FC<MyProfileDetailsProps> = ({ profileData, editMode, onInputChange }) => {
  const { height, weight } = profileData;

  return (
    <Container id="myDetails">
      <Box sx={{ mt: 1, p: 3 }}>
        <Typography variant="h6" gutterBottom>Physical Details</Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              variant="outlined"
              name="height"
              value={height}
              onChange={onInputChange}
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
              value={weight}
              onChange={onInputChange}
              sx={{ mb: 2 }}
              InputProps={{ readOnly: !editMode }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ borderBottom: '1px solid #ccc', mb: 3 }} />
    </Container>
  );
};

export default MyProfileDetails;
