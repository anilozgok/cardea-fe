import React from 'react';
import { Container, Typography, Button, Grid, Paper, Box, AppBar, Toolbar, CssBaseline, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useUser } from '../context/UserContext';
import logo from '../assets/CardeaLogo.png'; // Ensure the path is correct
import heroVideo from '../assets/hero-video.mp4'; // Ensure the path is correct
import '../App.css'; // Ensure the path is correct

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// Styled components using @mui/material/styles
const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '100vh',
    color: '#fff',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& video': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 0,
    },
    '& .content': {
        position: 'relative',
        zIndex: 1,
    },
}));

const FeaturesSection = styled(Container)(({ theme }) => ({
    padding: theme.spacing(8, 0),
}));

const FeatureItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[4],
    },
}));

const TestimonialsSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.background.paper,
}));

const FaqSection = styled(Container)(({ theme }) => ({
    padding: theme.spacing(8, 0),
}));

const Footer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(6, 0),
    backgroundColor: theme.palette.background.default,
}));

const LandingPage = () => {
    const user = useUser();
    const navigate = useNavigate();

    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} alt="Logo" style={{ width: 50, height: 50, marginRight: 20 }} onClick={() => navigate('/')} />
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Cardea
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/sign-in')}>Sign In</Button>
                    <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <HeroSection>
                <video autoPlay loop muted playsInline>
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Box className="content">
                    <Typography variant="h2" component="h1" gutterBottom>
                        Welcome to Cardea
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom>
                        Your fitness journey starts here.
                    </Typography>
                    <Button variant="contained" color="primary" size="large">
                        Get Started
                    </Button>
                </Box>
            </HeroSection>

            {/* Features Section */}
            <FeaturesSection>
                <Typography variant="h4" component="h2" gutterBottom align="center">
                    Features
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <FeatureItem>
                            <Typography variant="h6" component="h3">
                                Personalized Training Plans
                            </Typography>
                            <Typography>
                                Unlock your full potential with customized training programs designed to meet your unique fitness goals. Whether you're a beginner or an advanced athlete, our expert coaches tailor your workouts for maximum effectiveness.
                            </Typography>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FeatureItem>
                            <Typography variant="h6" component="h3">
                                Nutritional Guidance
                            </Typography>
                            <Typography>
                                Enhance your physical training with personalized nutritional plans that support your fitness goals. Our certified nutritionists create diet plans that complement your lifestyle and boost your performance.
                            </Typography>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FeatureItem>
                            <Typography variant="h6" component="h3">
                                Progress Tracking
                            </Typography>
                            <Typography>
                                Stay motivated with real-time tracking of your progress. Our platform provides detailed insights into your workouts, diet, and overall fitness journey, helping you stay on track and achieve your goals faster.
                            </Typography>
                        </FeatureItem>
                    </Grid>
                </Grid>
            </FeaturesSection>

            {/* Testimonials Section */}
            <TestimonialsSection>
                <Container>
                    <Typography variant="h4" component="h2" gutterBottom align="center">
                        Testimonials
                    </Typography>
                    <AutoPlaySwipeableViews>
                        <div>
                            <Typography variant="h6" component="h3">
                                Customer One: Alex Johnson, Amateur Marathon Runner
                            </Typography>
                            <Typography>
                                "Joining this coaching platform has revolutionized my training. The personalized attention and expert advice have prepared me perfectly for my first marathon. I've never felt more ready!"
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" component="h3">
                                Customer Two: Linda B., Fitness Enthusiast
                            </Typography>
                            <Typography>
                                "I highly recommend this service to anyone looking to elevate their fitness routine. The nutritional guidance and tailored workouts have made a significant difference in my physical health and energy levels."
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" component="h3">
                                Customer Three: Mark Turner, Professional Athlete
                            </Typography>
                            <Typography>
                                "The quality of coaching and support I've received has been outstanding. It's like having a personal trainer and nutritionist in one service, available anytime I need. Absolutely invaluable for my career."
                            </Typography>
                        </div>
                    </AutoPlaySwipeableViews>
                </Container>
            </TestimonialsSection>

            {/* FAQ Section */}
            <FaqSection>
                <Typography variant="h4" component="h2" gutterBottom align="center">
                    Frequently Asked Questions
                </Typography>
                <div>
                    <Typography variant="h6" component="h3">
                        What is this product?
                    </Typography>
                    <Typography>
                        This product is a comprehensive solution for managing your workout and diet plans.
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6" component="h3">
                        How does it work?
                    </Typography>
                    <Typography>
                        Simply sign up and start customizing your plans with our easy-to-use interface.
                    </Typography>
                </div>
            </FaqSection>

            {/* Footer */}
            <Footer>
                <Container>
                    <Typography variant="body1" color="textSecondary" align="center">
                        {'© '}
                        <Link color="inherit" href="https://your-website.com/">
                            Your Website
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </Footer>
        </div>
    );
};

export default LandingPage;
