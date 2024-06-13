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
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import useUsers from '../hooks/useUsers';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ToastContainer, toast } from 'react-toastify';
import dietBg from '../assets/diet.png';
import cryingOnion from '../assets/cryOnion.png';

interface DietPlan {
    ID: number;
    name: string;
    meals: Meal[];
}

interface Meal {
    ID: number;
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

const UpdateDeleteDietPlanPage: React.FC = () => {
    const { user } = useUser() as { user: { role: string; name: string } };
    const { users, loading: usersLoading, error: usersError } = useUsers() as { users: { userId: string, firstName: string, lastName: string }[]; loading: boolean; error: string };
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [profilePicture, setProfilePicture] = useState<string>('');

    const navigate = useNavigate();
    useEffect(() => {
        document.body.style.backgroundImage = `url(${dietBg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundRepeat = 'no-repeat';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.backgroundRepeat = '';
        };
    }, []);
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

    const fetchProfilePicture = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/profile-picture', { withCredentials: true });
            if (response.data && response.data.photoURL) {
                setProfilePicture(response.data.photoURL);
            }
        } catch (error) {
            console.error('Failed to fetch profile picture:', error);
        }
    };

    useEffect(() => {
        fetchProfilePicture();
    }, []);

    const handleDeleteDiet = async (dietId: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/diet?diet_id=${dietId}`, { withCredentials: true });
            toastInfo('success', 'Diet plan deleted successfully');
            fetchDietPlans(selectedUserId);
        } catch (error) {
            toastInfo('error', 'Failed to delete diet plan');
        }
    };

    const toastInfo = (toastMethod: string, messageToShow: string) => {
        const method = toastMethod === 'error' ? toast.error : toast.success;

        method(messageToShow, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    function capitalizeFirstLetter(string: string): string {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
                            <MenuItem onClick={() => navigate('/exercise')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Workouts
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/athlete-photos')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Body Transformations
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={profilePicture} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                        </Box>
                        <Button
                            onClick={handleLogout}
                            startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft: '20px' }} />}
                        >
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ mt: -30, mb: 2 }}>
                <Typography variant="h5" color="black">Delete Diet Plans</Typography>
            </Box>

            <FormControl fullWidth sx={{ mb: 4, minWidth: 500 }}>
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                    labelId="user-select-label"
                    value={selectedUserId}
                    label="Select User"
                    onChange={(e) => setSelectedUserId(e.target.value)}
                >
                    {users.map((user) => (
                        <MenuItem key={user.userId} value={user.userId}>{user.firstName} {user.lastName}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loading && <CircularProgress />}
            {usersLoading && <CircularProgress />}
            {usersError && <Typography color="error">{usersError}</Typography>}
            {message && <Typography color="success" sx={{ mt: 2 }}>{message}</Typography>}

            <Box sx={{ mt: 4 }}>
                {selectedUserId && dietPlans.length === 0 ? (
                    <Box>
                        <img src={cryingOnion} alt="No diet Plans" />
                        <Typography variant="h6" color="text.secondary">
                            {`${users.find(user => user.userId === selectedUserId)?.firstName || ''} ${users.find(user => user.userId === selectedUserId)?.lastName || ''} has no diet plans`}
                        </Typography>
                    </Box>
                ) : (
                    dietPlans.map((plan) => (
                        <Accordion key={plan.ID} sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">{plan.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Food Name</TableCell>
                                                <TableCell>Description</TableCell>
                                                <TableCell align="right">Calories</TableCell>
                                                <TableCell align="right">Protein</TableCell>
                                                <TableCell align="right">Carbs</TableCell>
                                                <TableCell align="right">Fat</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {plan.meals.map((meal) => (
                                                <TableRow key={meal.ID}>
                                                    <TableCell>{meal.name}</TableCell>
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
                                <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleDeleteDiet(plan.ID)}>
                                    Delete Diet
                                </Button>
                            </AccordionDetails>
                        </Accordion>
                    ))
                )}
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Container>
    );
};

export default UpdateDeleteDietPlanPage;
