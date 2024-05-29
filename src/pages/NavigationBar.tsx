import React from 'react';
import {AppBar, Toolbar, Typography, Box, Link, Avatar, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';
import { useUser } from '../context/UserContext';
import axios from "axios";

const NavigationBar = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const navigateTo = (url) => {
        navigate(url);
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

        <AppBar position="static">
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="Logo" style={{ width: 50, height: 50, marginRight: 20 }} onClick={() => navigateTo('/')} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Your Brand
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                    <Link href="/" variant="button" color="inherit" underline="none" sx={{ mx: 2 }}>
                        Home
                    </Link>
                    <Link href="/diets" variant="button" color="inherit" underline="none" sx={{ mx: 2 }}>
                        Diet Plans
                    </Link>
                    <Link href="/workouts" variant="button" color="inherit" underline="none" sx={{ mx: 2 }}>
                        Workouts
                    </Link>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={user.name} sx={{ width: 40, height: 40, cursor: 'pointer' }} onClick={() => navigateTo('/profile')} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mr: 2 }}>
                        Logout
                    </Button>
                    <Avatar src={user.name} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
