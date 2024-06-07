import React from 'react';
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
import {useUser} from "../context/UserContext.tsx";
import axios from "axios";
import logoName from "../assets/cardeaName.png";
import omer from "../assets/omer.jpg";
import sadik from "../assets/mert.jpg";
import anil from "../assets/anil.jpg";



const AboutUsPageNlg: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <Container>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'rgba(255, 255, 255, 0.8)',  // Ensuring background is slightly opaque
                    backgroundImage: 'none',
                    mt: 2,
                    color: 'black',  // Explicit text color
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
                                    ? 'rgba(255, 255, 255, 0.8)'  // Increased opacity
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 56,
                            border: '1px solid',
                            borderColor: 'divider',
                        })}
                    >
                        <img
                            src={logo}
                            alt="initial logo"
                            style={{ width: 80, height: 80, borderRadius: '50%' }}
                            onClick={() => navigate('/')}
                        />
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center', // Aligns the center logo in the middle
                            }}
                        >
                            <img
                                src={logoName}
                                alt="Cardea logo"
                                style={{ width: 130, height: 140, borderRadius: '50%' }}
                                onClick={() => navigate('/')}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Button color="inherit" onClick={() => navigate('/sign-in')}>Sign In</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>            <Box display="flex" justifyContent="center" my={4} mt={10}>
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

export default AboutUsPageNlg;
