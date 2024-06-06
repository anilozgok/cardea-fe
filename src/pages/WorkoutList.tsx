import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Toolbar,
  AppBar,
  Avatar,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import useWorkouts from '../hooks/useWorkouts';
import { useUser } from '../context/UserContext';
import logo from '../assets/CardeaLogo.png';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import workoutBg from '../assets/realworkbg3.png';

const WorkoutsList: React.FC = () => {
  const { user } = useUser();
  const { workouts, loading, error } = useWorkouts();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGif, setSelectedGif] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    // When the component mounts
    document.body.style.backgroundImage = `url(${workoutBg})`;
    document.body.style.backgroundSize = 'cover'; // Cover the viewport
    document.body.style.backgroundPosition = 'center'; // Center the background image
    document.body.style.backgroundAttachment = 'fixed'; // Make background fixed during scrolling
    document.body.style.backgroundRepeat = 'no-repeat'; // Do not repeat the image

    // When the component unmounts
    return () => {
        document.body.style.backgroundImage = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundAttachment = '';
        document.body.style.backgroundRepeat = '';
    };
}, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (workoutName) => {
    setOpen(open === workoutName ? null : workoutName);
  };

  const handleGifClick = (gifUrl) => {
    setSelectedGif(gifUrl);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const groupedWorkouts = workouts.reduce((acc, workout) => {
    if (!acc[workout.name]) {
      acc[workout.name] = [];
    }
    acc[workout.name].push(workout);
    return acc;
  }, {});

  const filteredWorkoutNames = Object.keys(groupedWorkouts).filter(workoutName =>
    workoutName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateTo = (url) => {
    navigate(url)
  };

  return (
      <Container maxWidth="xl" sx={{ mt: -20 }}>

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
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={logo}
                alt="logo of Cardea"
                style={{ width: 80, height: 80, borderRadius: '50%' }}
                onClick={() => navigateTo('/landing')}
              />
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
              <MenuItem onClick={() => navigateTo('/landing')} sx={{ py: '10px', px: '36px' }}>
                <Typography variant="body1" color="text.primary">
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/diet-plan-user')} sx={{ py: '10px', px: '36px' }}>
                <Typography variant="body1" color="text.primary">
                  Diet Plans
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => navigateTo('/workouts')} sx={{ py: '10px', px: '36px' }}>
                <Typography variant="body1" color="text.primary">
                  Workouts
                </Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
              <TextField
                variant="outlined"
                placeholder="Search Workouts"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ flex: 1, maxWidth: 300 }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={user.name} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigateTo('/profile')} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && filteredWorkoutNames.length === 0 && (
        <Typography>No workouts assigned yet.</Typography>
      )}
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table sx={{ minWidth: 1100, width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  Workout
                </Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredWorkoutNames.map((workoutName) => (
              <React.Fragment key={workoutName}>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell component="th" scope="row">
                    <Typography variant="subtitle1" component="div">
                      {workoutName}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleClick(workoutName)}
                    >
                      {open === workoutName ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    <Collapse in={open === workoutName} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="subtitle1" gutterBottom component="div" sx={{ fontWeight: 'bold' }}>
                          Exercises
                        </Typography>
                        <Table size="medium" aria-label="exercises">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 'bold' }}>Exercise Name</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Description</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Area</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Reps</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Sets</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Exercise Equipment</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Exercise Video</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {groupedWorkouts[workoutName].map((workout) => (
                              <TableRow key={workout.workoutId}>
                                <TableCell component="th" scope="row">
                                  <Typography variant="body2" component="div">
                                    {workout.exerciseName}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="body2" component="div">
                                    {workout.description}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="body2" component="div">
                                    {workout.area}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="body2" component="div">
                                    {workout.rep}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="body2" component="div">
                                    {workout.sets}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography variant="body2" component="div">
                                    {workout.equipment}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Button onClick={() => handleGifClick(workout.gifUrl)}>View</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          Exercise GIF
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: '300px', width: '500px', position: 'relative', overflow: 'hidden' }} >
            <iframe
              src={selectedGif}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            ></iframe>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                zIndex: 10,
              }}
              onClick={e => e.stopPropagation()}
            ></Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default WorkoutsList;
