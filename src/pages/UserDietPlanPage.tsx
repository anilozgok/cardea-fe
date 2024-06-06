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
    CircularProgress, MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/CardeaLogo.png';
import { useUser } from '../context/UserContext';
import { useDiet, DietProvider } from '../context/DietContext';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
                        <Button
                            onClick={handleLogout}
                            startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft: '20px' }} />}
                        >
                        </Button>
                    </Toolbar>
                </Container>
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
