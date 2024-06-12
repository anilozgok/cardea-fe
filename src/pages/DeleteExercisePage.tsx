import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    AppBar,
    Toolbar,
    Avatar,
    Button,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import useUsers from '../hooks/useUsers';
import useAllWorkouts from '../hooks/useAllWorkouts';
import workoutBg from '../assets/realworkbg3.png'
import { Workout } from '../types/Workout';

const DeleteWorkoutPage: React.FC = () => {
    const { user } = useUser();
    const { users, loading: usersLoading, error: usersError } = useUsers();
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const { workouts, loading: workoutsLoading, error: workoutsError } = useAllWorkouts();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleDeleteWorkout = async (workoutName: string) => {
        setLoading(true);
        try {
            const workoutsToDelete = workouts.filter(workout => workout.name === workoutName && workout.userId === parseInt(selectedUserId, 10));
            for (const workout of workoutsToDelete) {
                await axios.delete(`http://localhost:8080/api/v1/workout?workoutId=${workout.workoutId}`, { withCredentials: true });
            }
            setMessage('Workout deleted successfully');
            // Refresh the list of workouts after deletion
            setSelectedUserId(selectedUserId); // Trigger useEffect
        } catch (error) {
            console.error('Failed to delete workout:', error);
            setMessage('Failed to delete workout');
        } finally {
            setLoading(false);
        }
    };
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



    const groupedWorkouts = workouts
        .filter(workout => workout.userId === parseInt(selectedUserId, 10))
        .reduce((acc, workout) => {
            if (!acc[workout.name]) {
                acc[workout.name] = [];
            }
            acc[workout.name].push(workout);
            return acc;
        }, {} as Record<string, Workout[]>);

    return (
        <Container maxWidth="xl" sx={{ mt: 10 }}>
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
                                onClick={() => navigate('/landing')}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                            <MenuItem onClick={() => navigate('/landing')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Home
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/diet-plan')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Diet Plans
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/exercise')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Workouts
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/delete-exercise')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Delete Workout
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={user.name} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ mt: -50, mb: 2}}>
                <Typography variant="h5" color="black">Delete Workouts</Typography>
            </Box>

            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                    labelId="user-select-label"
                    value={selectedUserId}
                    label="Select User"
                    onChange={(e) => setSelectedUserId(e.target.value)}
                >
                    {users.map((user) => (
                        <MenuItem key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loading && <CircularProgress />}
            {message && <Typography color={message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>{message}</Typography>}
            {usersLoading && <CircularProgress />}
            {usersError && <Typography color="error">{usersError}</Typography>}
            {workoutsLoading && <CircularProgress />}
            {workoutsError && <Typography color="error">{workoutsError}</Typography>}

            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto', mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Workout Name</TableCell>
                            <TableCell>Exercises</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(groupedWorkouts).map((workoutName) => (
                            <TableRow key={workoutName}>
                                <TableCell>{workoutName}</TableCell>
                                <TableCell>
                                    <ul>
                                        {groupedWorkouts[workoutName].map((workout, index) => (
                                            workout.exercises?.map((exercise, idx) => (
                                                <li key={`${index}-${idx}`}>{exercise.name}</li>
                                            ))
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteWorkout(workoutName)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default DeleteWorkoutPage;
