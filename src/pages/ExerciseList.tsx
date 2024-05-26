import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, IconButton, Typography, Container, Stack, Checkbox, FormControlLabel, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useExercises } from '../context/ExerciseContext';
import logo from '../assets/CardeaLogo.png';

const ExerciseList: React.FC = () => {
    const { exercises } = useExercises();
    const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
    const [workoutName, setWorkoutName] = useState('');
    const [userId, setUserId] = useState('');
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [showWorkoutDetails, setShowWorkoutDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleExerciseSelect = (id: string) => {
        setSelectedExercises((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((exerciseId) => exerciseId !== id) : [...prevSelected, id]
        );
    };

    const handleCreateWorkout = () => {
        if (workoutName && userId && selectedExercises.length > 0) {
            setShowWorkoutDetails(true);
            const workout = {
                name: workoutName,
                userId: userId,
                exercises: selectedExercises,
            };
            console.log('Workout created:', workout);
            // Here you can handle the workout creation logic, like sending it to the server
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
                                <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2 }}>
                                    <IconButton color="primary"><EditIcon /></IconButton>
                                    <IconButton color="secondary"><DeleteIcon /></IconButton>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {!showWorkoutForm && (
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
                    <TextField
                        fullWidth
                        label="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleCreateWorkout}>
                        Create Workout
                    </Button>
                </Box>
            )}
            {showWorkoutDetails && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">Workout Details</Typography>
                    <Typography variant="body1">Username: {userId}</Typography>
                    <Typography variant="body1">Workout Name: {workoutName}</Typography>
                </Box>
            )}
        </Container>
    );
};

export default ExerciseList;
