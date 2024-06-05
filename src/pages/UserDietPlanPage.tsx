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
    Button, MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';
import axios from "axios";
import { useUser } from '../context/UserContext';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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
            <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}>
                <Container maxWidth="lg">
                    <Toolbar variant="regular" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '999px', bgcolor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(24px)', maxHeight: 56, border: '1px solid', borderColor: 'divider', padding: '0 24px' }}>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="logo of Cardea" style={{ width: 80, height: 80, borderRadius: '50%' }} />
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', ml: 4 }}>
                                <MenuItem onClick={() => navigate('/')}>
                                    <Typography variant="body1" color="text.primary">Home</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/workouts')}>
                                    <Typography variant="body1" color="text.primary">Workouts</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/diet-plan-user')}>
                                    <Typography variant="body1" color="text.primary">Diet Plans</Typography>
                                </MenuItem>

                                <MenuItem onClick={() => navigate('/upload-photos')}>
                                    <Typography variant="body1" color="text.primary">Body Transformation</Typography>
                                </MenuItem>
                            </Box>
                            <Avatar sx={{ width: 40, height: 40 }} onClick={() => navigate('/profile')} />
                            <Button
                                onClick={handleLogout}
                                startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft:'20px'}} />} // You can adjust the size here
                            >
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
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
