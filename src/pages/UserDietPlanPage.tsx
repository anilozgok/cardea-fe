import React, { useEffect } from 'react';
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
import axios from 'axios';
import logo from '../assets/CardeaLogo.png';
import { useUser } from '../context/UserContext';
import { useDiet, DietProvider } from '../context/DietContext';

const UserDietPlanPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { dietPlans, loading, error, fetchDietPlans } = useDiet();

    useEffect(() => {
        if (user && user.userId) {
            fetchDietPlans(user.userId);
        }
    }, [user, fetchDietPlans]);


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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dietPlan.meals.map((meal, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {meal.name}
                                            </TableCell>
                                            <TableCell>{meal.description}</TableCell>
                                            <TableCell align="right">{meal.calories}</TableCell>
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

const UserDietPlanPageWithProvider: React.FC = () => (
    <DietProvider>
        <UserDietPlanPage />
    </DietProvider>
);

export default UserDietPlanPageWithProvider;
