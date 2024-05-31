// src/pages/UserDietPlanPage.tsx
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import logo from '../assets/CardeaLogo.png';
import { useUser } from '../context/UserContext';

interface DietPlan {
    id: number;
    name: string;
    meals: Meal[];
}

interface Meal {
    id: number;
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

const UserDietPlanPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDietPlans = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/diet?user_id=${user.id}`, { withCredentials: true });
                setDietPlans(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch diet plans');
                setLoading(false);
            }
        };

        fetchDietPlans();
    }, [user.id]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/'); // Redirect to the landing page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 10 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ width: 50, height: 50, marginRight: 20 }}
                        onClick={() => navigate('/')}
                    />
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Cardea
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>Home Page</Button>
                    <Button color="inherit" onClick={() => navigate('/profile')}>My Profile</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mr: 2 }}>
                            Logout
                        </Button>
                        <Avatar src={user.avatarUrl} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ mt: 10, mb: 2 }}>
                <Typography variant="h5" color="black">Diet Plans</Typography>
            </Box>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                dietPlans.map((dietPlan) => (
                    <Box key={dietPlan.id} sx={{ mb: 4 }}>
                        <Typography variant="h6" color="primary">{dietPlan.name}</Typography>
                        <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Meal</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Calories</TableCell>
                                        <TableCell align="right">Protein (g)</TableCell>
                                        <TableCell align="right">Carbs (g)</TableCell>
                                        <TableCell align="right">Fat (g)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dietPlan.meals.map((meal) => (
                                        <TableRow key={meal.id}>
                                            <TableCell component="th" scope="row">
                                                {meal.name}
                                            </TableCell>
                                            <TableCell>{meal.description}</TableCell>
                                            <TableCell align="right">{meal.calories}</TableCell>
                                            <TableCell align="right">{meal.protein}</TableCell>
                                            <TableCell align="right">{meal.carbs}</TableCell>
                                            <TableCell align="right">{meal.fat}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ))
            )}
        </Container>
    );
};

export default UserDietPlanPage;
