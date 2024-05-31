import React from 'react';
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
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';
import axios from "axios";
import { useUser } from '../context/UserContext';

const UserDietPlanPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    // Static diet plan data
    const dietPlans = [
        {
            id: 1,
            meal: 'Breakfast',
            description: 'Oatmeal with fruits',
            gram: 200,
        },
        {
            id: 2,
            meal: 'Lunch',
            description: 'Grilled chicken with vegetables',
            gram: 300,
        },
        {
            id: 3,
            meal: 'Dinner',
            description: 'Salmon with salad',
            gram: 250,
        },
        {
            id: 4,
            meal: 'Snack',
            description: 'Greek yogurt with honey',
            gram: 150,
        },
    ];

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
                <Typography variant="h5" color="black">Diet Plan</Typography>
            </Box>

            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Meal</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Gram</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dietPlans.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell component="th" scope="row">
                                    {plan.meal}
                                </TableCell>
                                <TableCell>{plan.description}</TableCell>
                                <TableCell align="right">{plan.gram}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UserDietPlanPage;
