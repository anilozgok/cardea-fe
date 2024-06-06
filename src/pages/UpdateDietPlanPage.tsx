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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import useUsers from '../hooks/useUsers';

const UpdateDeleteDietPlanPage: React.FC = () => {
    const { user } = useUser();
    const { users, loading: usersLoading, error: usersError } = useUsers();
    const [selectedUserId, setSelectedUserId] = useState('');
    const [dietPlans, setDietPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (selectedUserId) {
            fetchDietPlans(selectedUserId);
        }
    }, [selectedUserId]);

    const fetchDietPlans = async (userId: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/diet?user_id=${userId}`, { withCredentials: true });
            setDietPlans(response.data);
        } catch (error) {
            console.error('Failed to fetch diet plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteDiet = async (dietId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/diet?diet_id=${dietId}`, { withCredentials: true });
            setMessage('Diet plan deleted successfully');
            fetchDietPlans(selectedUserId);
        } catch (error) {
            console.error('Failed to delete diet plan:', error);
        }
    };

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
                <Typography variant="h5" color="black">Update and Delete Diet Plans</Typography>
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
                        <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loading && <CircularProgress />}
            {usersLoading && <CircularProgress />}
            {usersError && <Typography color="error">{usersError}</Typography>}
            {message && <Typography color="success" sx={{ mt: 2 }}>{message}</Typography>}

            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto', mt: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Diet Plan Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dietPlans.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell>{plan.name}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteDiet(plan.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UpdateDeleteDietPlanPage;
