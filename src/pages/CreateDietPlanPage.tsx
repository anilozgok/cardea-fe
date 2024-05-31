import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from "../assets/CardeaLogo.png";
import useUsers from '../hooks/useUsers';
import useFoods from '../hooks/useFoods';

const CreateDietPlanPage: React.FC = () => {
    const { user } = useUser();
    const { users, loading: usersLoading, error: usersError } = useUsers();
    const { foods, loading: foodsLoading, error: foodsError } = useFoods();
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [mealName, setMealName] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [mealItems, setMealItems] = useState<any[]>([]);
    const [creating, setCreating] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleSelectFood = (food: any) => {
        setSearchTerm(food.name);
    };

    const handleAddMealItem = () => {
        const selectedFood = foods.find(food => food.name === searchTerm);
        if (selectedFood) {
            setMealItems([...mealItems, { ...selectedFood, quantity: parseInt(quantity), description }]);
            setQuantity('');
            setDescription('');
            setSearchTerm('');
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

    const handleCreateDietPlan = async () => {
        if (!mealName || mealItems.length === 0 || !selectedUserId) {
            alert('Please fill in all fields and add at least one meal item.');
            return;
        }
        setCreating(true);
        try {
            await axios.post('http://localhost:8080/api/v1/diet', {
                user_id: parseInt(selectedUserId),
                name: mealName,
                meals: mealItems.map(item => ({
                    name: item.name,
                    description: item.description,
                    calories: item.calories,
                    protein: item.protein,
                    carbs: item.carbs,
                    fat: item.fat,
                })),
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
            <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}>
                <Container maxWidth="lg">
                    <Toolbar variant="regular" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, borderRadius: '999px', bgcolor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(24px)', maxHeight: 56, border: '1px solid', borderColor: 'divider', boxShadow: '0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="logo of Cardea" style={{ width: 80, height: 80, borderRadius: '50%' }} onClick={() => navigate('/')} />
                        </Box>
                        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                            <MenuItem onClick={() => navigate('/')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/update-diet')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">Update & Delete Diet</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mr: 2 }}>Logout</Button>
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
                    {users.map(user => (
                        <MenuItem key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</MenuItem>
                    ))}
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
                <TextField
                    fullWidth
                    label="Search Food"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mr: 2 }}
                />
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

            {searchTerm && (
                <TableContainer component={Paper} sx={{ mb: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Food Name</TableCell>
                                <TableCell>Calories</TableCell>
                                <TableCell>Protein</TableCell>
                                <TableCell>Carbs</TableCell>
                                <TableCell>Fat</TableCell>
                                <TableCell>Select</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase())).map((food) => (
                                <TableRow key={food.id}>
                                    <TableCell>{food.name}</TableCell>
                                    <TableCell>{food.calorie}</TableCell>
                                    <TableCell>{food.protein}</TableCell>
                                    <TableCell>{food.carbohydrate}</TableCell>
                                    <TableCell>{food.fat}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleSelectFood(food)}>Select</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

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
            {creating && <CircularProgress />}
            {message && <Typography color={message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>{message}</Typography>}
            {usersLoading && <CircularProgress />}

            Kodu kopyala
            {usersError && <Typography color="error">{usersError}</Typography>}
            {foodsLoading && <CircularProgress />}
            {foodsError && <Typography color="error">{foodsError}</Typography>}
            <Button variant="contained" onClick={handleCreateDietPlan} disabled={creating}>
                {creating ? 'Creating...' : 'Create Diet Plan'}
            </Button>
        </Container>
    );
};

export default CreateDietPlanPage;