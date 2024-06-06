import React, { useState, useEffect } from 'react';
import {
    Grid,
    Card,
    CardContent,
    TextField,
    Typography,
    Container,
    Stack,
    Checkbox,
    FormControlLabel,
    Button,
    Box,
    MenuItem,
    CircularProgress,
    AppBar, Toolbar,
    Avatar
} from '@mui/material';
import { useExercises } from '../context/ExerciseContext';
import { useUser } from '../context/UserContext';
import useUsers from '../hooks/useUsers';
import logo from '../assets/CardeaLogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import workoutBg from '../assets/realworkbg3.png'
const ExerciseList: React.FC = () => {
    const { exercises } = useExercises();
    const { user } = useUser();
    const { users, loading, error } = useUsers();
    const [selectedExercises, setSelectedExercises] = useState<{ id: string, reps: number, sets: number, description: string }[]>([]);
    const [workoutName, setWorkoutName] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleExerciseSelect = (id: string) => {
        setSelectedExercises((prevSelected) => {
            const existing = prevSelected.find(exercise => exercise.id === id);
            if (existing) {
                return prevSelected.filter(exercise => exercise.id !== id);
            } else {
                return [...prevSelected, { id, reps: 10, sets: 3, description: '' }];
            }
        });
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


    const handleExerciseChange = (id: string, field: string, value: string | number) => {
        setSelectedExercises(prevSelected => prevSelected.map(exercise =>
            exercise.id === id ? { ...exercise, [field]: value } : exercise
        ));
    };

    const handleCreateWorkout = async () => {
        if (workoutName && selectedUserId && selectedExercises.length > 0) {
            try {
                for (const { id, reps, sets, description } of selectedExercises) {
                    const exercise = exercises.find(ex => ex.exerciseId.toString() === id);
                    const workout = {
                        name: workoutName,
                        userId: parseInt(selectedUserId, 10),
                        exercise: parseInt(id, 10),
                        description: description,
                        area: exercise ? exercise.bodyPart : 'Area',
                        rep: reps,
                        sets: sets
                    };
                    await axios.post('http://localhost:8080/api/v1/workout', workout, { withCredentials: true });
                }
                console.log('Workouts created successfully');
                setWorkoutName('');
                setSelectedUserId('');
                setSelectedExercises([]);
                setShowWorkoutForm(false);
                setShowWorkoutDetails(false);
            } catch (error) {
                console.error('Error creating workout:', error);
            }
        } else {
            alert('Please fill in all fields and select at least one exercise.');
        }
    };

    const filteredExercises = exercises.filter(exercise =>
        exercise.exerciseName && exercise.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{
            // backgroundImage: `url(${workoutBg})`,
            backgroundSize: 'cover', // Cover the entire Container
            backgroundPosition: 'center', // Center the background image
            minHeight: '150vh', // Optional: Set a minimum height for the container
            width: '100%', // Optional: Set the width if necessary
            padding: '20px' // Optional: Add some padding inside the container
        }}>
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
                            <MenuItem onClick={() => navigate('/exercises')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Workouts
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={user.name} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box display="flex" alignItems="center" sx={{ mb: 4, mt: 12 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1, color: 'blue' }}>EXERCISES</Typography>
            </Box>
            <TextField
                fullWidth
                label="Search Exercises"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 4, border: '1px solid rgba(0, 0, 0, 0.34)' }}
            />
            <Grid container spacing={4}>
                {filteredExercises.map((exercise) => (
                    <Grid item xs={12} sm={6} md={4} key={exercise.exerciseId}>
                        <Card sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust transparency with the last value (0 to 1)
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', // Optional: adds shadow for better distinction
                            border: '1px solid rgba(0, 0, 0, 0.1)' // Optional: adds a subtle border
                        }}>
                            <Box sx={{ height: '140px', position: 'relative', overflow: 'hidden' }}>
                                <iframe
                                    src={exercise.gifUrl}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen
                                    title={exercise.exerciseName}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                ></iframe>
                            </Box>
                            <CardContent>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedExercises.some(ex => ex.id === exercise.exerciseId.toString())}
                                            onChange={() => handleExerciseSelect(exercise.exerciseId.toString())}
                                            color="primary"
                                            disabled={user.role !== 'coach'}
                                        />
                                    }
                                    label={
                                        <Typography variant="h6" gutterBottom>
                                            {exercise.exerciseName}
                                        </Typography>
                                    }
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Body Part: {exercise.bodyPart}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Target: {exercise.target}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Equipment: {exercise.equipment}
                                </Typography>
                                {user.role === 'coach' && (
                                    <Stack spacing={2} sx={{ mt: 2 }}>
                                        <TextField
                                            size="small"
                                            type="number"
                                            label="Reps"
                                            value={selectedExercises.find(ex => ex.id === exercise.exerciseId.toString())?.reps || 10}
                                            onChange={(e) => handleExerciseChange(exercise.exerciseId.toString(), 'reps', parseInt(e.target.value))}
                                            sx={{ width: '100%' }}
                                        />
                                        <TextField
                                            size="small"
                                            type="number"
                                            label="Sets"
                                            value={selectedExercises.find(ex => ex.id === exercise.exerciseId.toString())?.sets || 3}
                                            onChange={(e) => handleExerciseChange(exercise.exerciseId.toString(), 'sets', parseInt(e.target.value))}
                                            sx={{ width: '100%' }}
                                        />
                                        <TextField
                                            size="small"
                                            label="Description"
                                            value={selectedExercises.find(ex => ex.id === exercise.exerciseId.toString())?.description || ''}
                                            onChange={(e) => handleExerciseChange(exercise.exerciseId.toString(), 'description', e.target.value)}
                                            sx={{ width: '100%' }}
                                        />
                                    </Stack>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {user.role === 'coach' && !showWorkoutForm && (
                <Box sx={{ mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={() => setShowWorkoutForm(true)}>
                        New Workout
                    </Button>
                </Box>
            )}
            {showWorkoutForm && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Create Workout</Typography>
                    <TextField
                        fullWidth
                        label="Workout Name"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <TextField
                            select
                            fullWidth
                            label="Select User"
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            sx={{ mb: 2 }}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.userId} value={user.userId}>
                                    {user.firstName} {user.lastName}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    {error && (
                        <Typography color="error" variant="body2">
                            Error loading users: {error}
                        </Typography>
                    )}
                    <Button variant="contained" color="primary" onClick={handleCreateWorkout}>
                        Create Workout
                    </Button>
                </Box>
            )}
            {showWorkoutDetails && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Workout Details</Typography>
                    <Typography variant="body1">Username: {selectedUserId}</Typography>
                    <Typography variant="body1">Workout Name: {workoutName}</Typography>
                </Box>
            )}
        </Container>
    );
};

export default ExerciseList;
