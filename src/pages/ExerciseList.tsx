import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, IconButton, Typography, Container, Stack, Checkbox, FormControlLabel, Button, Box, MenuItem, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useExercises } from '../context/ExerciseContext';
import { useUser } from '../context/UserContext';
import useUsers from '../hooks/useUsers'; // Import the custom hook
import logo from '../assets/CardeaLogo.png';
import axios from 'axios';

const ExerciseList: React.FC = () => {
    const { exercises } = useExercises();
    const { user } = useUser();
    const { users, loading, error } = useUsers(); // Use the custom hook
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const [workoutName, setWorkoutName] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleExerciseSelect = (id: string) => {
        setSelectedExercises((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((exerciseId) => exerciseId !== id) : [...prevSelected, id]
        );
    };

    const handleCreateWorkout = async () => {
        if (workoutName && selectedUserId && selectedExercises.length > 0) {
            try {
                for (const exerciseId of selectedExercises) {
                    const workout = {
                        name: workoutName,
                        userId: parseInt(selectedUserId, 10), // Ensure userId is an integer
                        exercise: parseInt(exerciseId, 10), // Ensure exerciseId is an integer
                        description: 'Description', // Add appropriate description
                        area: 'Area', // Add appropriate area
                        rep: 10, // Add appropriate reps
                        sets: 3 // Add appropriate sets
                    };
                    await axios.post('http://localhost:8080/api/v1/workout', workout, { withCredentials: true });
                }
                console.log('Workouts created successfully');
                // Reset the form after successful creation
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
        <Container>
            <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '20px' }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', flexGrow: 1 }}>EXERCISES</Typography>
            </Box>
            <TextField
                fullWidth
                label="Search Exercises"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 4 }}
            />
            <Grid container spacing={4}>
                {filteredExercises.map((exercise) => (
                    <Grid item xs={12} sm={6} md={4} key={exercise.exerciseId}>
                        <Card>
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
                                            checked={selectedExercises.includes(exercise.exerciseId.toString())}
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
                                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                        <TextField
                                            size="small"
                                            type="number"
                                            label="Reps"
                                            defaultValue="10"
                                            sx={{ width: '50%' }}
                                        />
                                        <TextField
                                            size="small"
                                            type="number"
                                            label="Sets"
                                            defaultValue="3"
                                            sx={{ width: '50%' }}
                                        />
                                    </Stack>
                                )}
                                {user.role === 'coach' && (
                                    <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                                        <IconButton color="primary"><EditIcon /></IconButton>
                                        <IconButton color="secondary"><DeleteIcon /></IconButton>
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
