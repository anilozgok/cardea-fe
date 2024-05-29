import React from 'react';
import { AppBar, Toolbar, Typography, Box, Link, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';
import { useUser } from '../context/UserContext';

const NavigationBar = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const navigateTo = (url) => {
        navigate(url);
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
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
