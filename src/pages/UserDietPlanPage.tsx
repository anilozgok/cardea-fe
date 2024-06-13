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
    MenuItem,
    TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/CardeaLogo.png';
import { useUser } from '../context/UserContext';
import { useDiet, DietProvider } from '../context/DietContext';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import dietBg from '../assets/diet.png';
import cryingOnion from '../assets/cryOnion.png';
import { User } from '../context/UserContextProvider';

interface LocalUser extends User {
    userId: number;
}
// Imports and context setup remains the same

const UserDietPlanPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { dietPlans, loading, error, fetchDietPlans } = useDiet();
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        // Fetch user-specific diet plans
        const localUser = user as LocalUser;
        if (localUser && localUser.userId) {
            fetchDietPlans(localUser.userId);
        }
    }, [user, fetchDietPlans]);

    useEffect(() => {
        // Fetch profile picture on component mount
        const fetchProfilePicture = async () => {
            try {
                const response = await axios.get('http://34.116.133.84:8080/api/v1/user/profile-picture', { withCredentials: true });
                if (response.data && response.data.photoURL) {
                    setProfilePicture(response.data.photoURL);
                }
            } catch (error) {
                console.error('Failed to fetch profile picture:', error);
            }
        };

        fetchProfilePicture();
        // Background image setup
        document.body.style.backgroundImage = `url(${dietBg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundRepeat = 'no-repeat';

        return () => {
            // Cleanup background style
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.backgroundRepeat = '';
        };
    }, []);

    const handleLogout = async () => {
        // Logout function
        try {
            await axios.post('http://34.116.133.84:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredDietPlans = dietPlans.filter(dietPlan =>
        dietPlan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render the component UI
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
                            <MenuItem onClick={() => navigate('/diet-plan-user')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Diet Plans
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/workouts')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Workouts
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/upload-photos')}>
                                <Typography variant="body1" color="text.primary">Body Transformation</Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, mr:2 }}>
                            <TextField
                                variant="outlined"
                                placeholder="Search Diet Plans"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                sx={{ flex: 1, maxWidth: 300 }}
                            />
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
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : filteredDietPlans.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <img src={cryingOnion} alt="Crying Onion" />
                    <Typography variant="h6" color="black">No diet plans assigned for now.</Typography>
                    <Typography variant="h6" color="black">If you think there is a mistake, you can contact your coach.</Typography>
                </Box>
            ) : (
                filteredDietPlans.map((dietPlan) => (
                    <Box key={dietPlan.id} sx={{ mb: 4 }}>
                        <Typography variant="h6" color="primary">{dietPlan.name}</Typography>
                        <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Meal</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Grams</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dietPlan.meals.map((meal, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {meal.name}
                                            </TableCell>
                                            <TableCell>{meal.description}</TableCell>
                                            <TableCell align="right">{meal.gram}</TableCell> {/* Displaying grams */}
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
