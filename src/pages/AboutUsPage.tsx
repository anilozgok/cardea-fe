import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Avatar,
    Button, AppBar, Toolbar, MenuItem,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from "../assets/CardeaLogo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import anil from "../assets/anil.jpg"
import omer from "../assets/omer.jpg"
import sadik from "../assets/mert.jpg"
import { useUser } from '../context/UserContext';

const AboutUsPage: React.FC = () => {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState<string>('');
    const { user } = useUser();
    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const response = await axios.get('http://34.116.133.84:8080/api/v1/user/profile-picture', { withCredentials: true });
                if (response.data) {
                    setProfilePicture(response.data.photoURL); // Assuming the response contains a URL in the `url` field
                }
            } catch (error) {
                console.error('Failed to fetch profile picture:', error);
            }
        };

        fetchProfilePicture();
    }, []);
    const handleLogout = async () => {
        try {
            await axios.post('http://34.116.133.84:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleNavigate = (operation: string) => {
        var url = '';
        const isCoach = user.role === 'coach';
        switch (operation) {
            case 'workout':
                url = isCoach ? '/exercise' : '/workouts'
                break;
            case 'diet':
                url = isCoach ? '/diet-plan' : '/diet-plan-user'
                break;
            case 'photo':
                url = isCoach ? '/athlete-photos' : '/upload-photos'
                break;
        }
        navigate(url)
    }


    return (
        <Container>
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
                            <MenuItem onClick={() => handleNavigate('diet')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Diet Plans
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigate('workout')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Workouts
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigate('photo')}>
                                <Typography variant="body1" color="text.primary">Body Transformation</Typography>
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
            <Box display="flex" justifyContent="center" my={4} mt={11}>
                <Typography variant="h3" component="h1" sx={{color:"black"}}>About Us</Typography>
            </Box>
            <Box display="flex" justifyContent="center" my={4}>
                <Typography variant="h5" component="h2" align="center" sx={{color:"black"}}>
                    Our mission is to streamline the management of sports and fitness coaching by eliminating the need for disparate tools like Excel, Word, and various drive applications. We've created a singular, unified platform where coaches and athletes can log in and manage all their activities seamlessly. This simplifies workflows, enhances communication, and keeps all necessary information in one secure, accessible place.
                </Typography>
            </Box>
            <Box my={4}>
                <Typography variant="h4" component="h3">Features </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h4">For Coaches</Typography>
                            <Typography variant="body1" component="p" paragraph>
                                - Manage athlete profiles and track progress
                                <br />
                                - Assign workouts and diet plans
                                <br />
                                - Monitor athlete performance and provide feedback
                                <br />
                                - Health calculators for BMI, BMR, and more
                                <br />
                                - Streamlined communication with athletes
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h4">For Athletes</Typography>
                            <Typography variant="body1" component="p" paragraph>
                                - Access personalized workout and diet plans
                                <br />
                                - Track your progress and performance
                                <br />
                                - Communicate with your coach easily
                                <br />
                                - Utilize health calculators for better fitness insights
                                <br />
                                - Store and view personal health data securely
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box my={4}>
                <Typography variant="h4" component="h3">Our Team</Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Avatar alt="Omer Faruk Goren" src={omer} sx={{ width: 56, height: 56, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6" component="h5">Omer F. Goren</Typography>
                                    <Typography variant="body2" component="p">DevOps Engineer</Typography>
                                </Box>
                            </Box>
                            <Box mt={2}>
                                <Button variant="outlined" startIcon={<LinkedInIcon />} href="https://www.linkedin.com/in/omergrn/">
                                    LinkedIn
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Avatar alt="Sadik M. Unaler" src={sadik} sx={{ width: 56, height: 56, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6" component="h5">Sadik M. Unaler</Typography>
                                    <Typography variant="body2" component="p">Backend Engineer</Typography>
                                </Box>
                            </Box>
                            <Box mt={2}>
                                <Button variant="outlined" startIcon={<LinkedInIcon />} href="https://www.linkedin.com/in/mertunaler/">
                                    LinkedIn
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center">
                                <Avatar alt="Anil Can Ozgok" src={anil} sx={{ width: 56, height: 56, mr: 2 }} />
                                <Box>
                                    <Typography variant="h6" component="h5">Anil Can Ozgok</Typography>
                                    <Typography variant="body2" component="p">DevX Engineer</Typography>
                                </Box>
                            </Box>
                            <Box mt={2}>
                                <Button variant="outlined" startIcon={<LinkedInIcon />} href="https://www.linkedin.com/in/anil-can-ozgok/">
                                    LinkedIn
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AboutUsPage;
