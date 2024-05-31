import React, { useState } from 'react';
import {
    Container,
    Typography,
    CircularProgress,
    Box,
    TextField,
    MenuItem,
    Button,
    Select,
    FormControl,
    InputLabel,
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
} from '@mui/material';
import { useUser } from '../context/UserContext';
import useFoods from '../hooks/useFoods';
import axios from 'axios';
import logo from "../assets/CardeaLogo.png";
import { useNavigate } from "react-router-dom";

const CreateDietPlanPage: React.FC = () => {
    const { user } = useUser();
    const { foods, loading, error } = useFoods();
    const [selectedUserId, setSelectedUserId] = useState('');
    const [mealName, setMealName] = useState('');
    const [selectedFoodId, setSelectedFoodId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [mealItems, setMealItems] = useState([]);
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleAddMealItem = () => {
        const selectedFood = foods.find(food => food.id === parseInt(selectedFoodId));
        setMealItems([...mealItems, { ...selectedFood, quantity: parseInt(quantity), description }]);
        setSelectedFoodId('');
        setQuantity('');
        setDescription('');
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/'); // Redirect to the landing page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleCreateDietPlan = async () => {
        if (!mealName || mealItems.length === 0) {
            alert('Please fill in all fields and add at least one meal item.');
            return;
        }
        setCreating(true);
        try {
            await axios.post('http://localhost:8080/api/v1/diet-plans', {
                coachId: user.id,
                userId: parseInt(selectedUserId),
                meals: [
                    {
                        mealName,
                        foods: mealItems.map(item => ({
                            foodId: item.id,
                            quantity: item.quantity,
                            description: item.description,
                        })),
                    },
                ],
            }, { withCredentials: true });
            setMessage('Diet plan created successfully');
            setMealName('');
            setMealItems([]);
        } catch (err) {
            setMessage('Failed to create diet plan');
        } finally {
            setCreating(false);
        }
    };

    return (
        <Container maxWidth="md">
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
                                onClick={() => navigate('/')}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                            <MenuItem onClick={() => navigate('/')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Home
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/update-diet')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Update & Delete Diet
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mr: 2 }}>
                                Logout
                            </Button>
                            <Avatar src={user.avatarUrl} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Typography variant="h4" sx={{ my: 4 }}>Create Diet Plan</Typography>
            <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                    labelId="user-select-label"
                    value={selectedUserId}
                    label="Select User"
                    onChange={(e) => setSelectedUserId(e.target.value)}
                >
                    {/* Replace with actual user data */}
                    <MenuItem value={1}>User 1</MenuItem>
                    <MenuItem value={2}>User 2</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Meal Name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                sx={{ mb: 4 }}
            />
            <Box sx={{ display: 'flex', mb: 4 }}>
                <FormControl fullWidth sx={{ mr: 2 }}>
                    <InputLabel id="food-select-label">Select Food</InputLabel>
                    <Select
                        labelId="food-select-label"
                        value={selectedFoodId}
                        label="Select Food"
                        onChange={(e) => setSelectedFoodId(e.target.value)}
                    >
                        {foods.map((food) => (
                            <MenuItem key={food.id} value={food.id}>{food.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Quantity (grams)"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button onClick={handleAddMealItem} sx={{ ml: 2 }}>Add</Button>
            </Box>
            <TableContainer component={Paper} sx={{ mb: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Food Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mealItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.quantity} g</TableCell>
                                <TableCell>{item.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" onClick={handleCreateDietPlan} disabled={creating}>
                {creating ? 'Creating...' : 'Create Diet Plan'}
            </Button>
            {message && <Typography color="success" sx={{ mt: 2 }}>{message}</Typography>}
        </Container>
    );
};

export default CreateDietPlanPage;
