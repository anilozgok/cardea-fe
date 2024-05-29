import React from 'react';
import { Container, Typography, Button, Grid, Paper, Box, AppBar, Toolbar, CssBaseline, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useUser } from '../context/UserContext';
import logo from '../assets/CardeaLogo.png'; // Ensure the path is correct
import water from '../assets/water-intake.png'; // Ensure the path is correct
import caffeine from '../assets/caffeine.jpeg'; // Ensure the path is correct
import calorie from '../assets/calorie.jpeg'; // Ensure the path is correct
import bmi from '../assets/bmi.jpeg'; // Ensure the path is correct
import bodyfat from '../assets/bodyfat.jpeg'; // Ensure the path is correct
import idealweight from '../assets/idealw.jpeg'; // Ensure the path is correct

import '../App.css'; // Ensure the path is correct

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const darkThemeBackground = '#1c1c1c';
const lightTextColor = '#f8f8f8';
const brightButtonColor = '#ffeb3b';

const FeaturesSection = styled(Container)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    backgroundColor: darkThemeBackground,
    color: lightTextColor,
    '& .MuiTypography-root': {
        fontWeight: 'bold',
    },
}));

const FeatureItem = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    backgroundColor: '#333',
    color: lightTextColor,
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[4],
    },
}));

const Section = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    backgroundColor: darkThemeBackground,
    color: lightTextColor,
    '& .MuiTypography-root': {
        fontWeight: 'bold',
    },
}));

const TestimonialsSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    backgroundColor: darkThemeBackground,
    color: lightTextColor,
    '& .MuiTypography-root': {
        fontWeight: 'bold',
    },
}));

const FaqSection = styled(Container)(({ theme }) => ({
    padding: theme.spacing(8, 0),
    backgroundColor: darkThemeBackground,
    color: lightTextColor,
    '& .MuiTypography-root': {
        fontWeight: 'bold',
    },
}));

const Footer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(6, 0),
    backgroundColor: darkThemeBackground,
    color: lightTextColor,
    '& .MuiTypography-root': {
        fontWeight: 'bold',
    },
}));

const SectionGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(4),
    justifyContent: 'center',
}));

const FeatureItemButton = styled(Button)(({ theme }) => ({
    backgroundColor: brightButtonColor,
    color: '#333',
    marginTop: theme.spacing(2),
    '&:hover': {
        backgroundColor: '#ffd700',
    },
}));

const LandingPage = () => {
    const user = useUser();
    const navigate = useNavigate();

    return (
        <div id="root">
            <CssBaseline />
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={logo}
                                alt="logo of Cardea"
                                style={{ width: 50, height: 50, marginRight: 20 }}
                                onClick={() => navigate('/')}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                            <Button color="inherit" onClick={() => navigate('/sign-in')}>Sign In</Button>
                            <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Features Section */}
            <FeaturesSection>
                <Typography variant="h4" component="h2" gutterBottom align="center">
                    Features
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem>
                            <Typography variant="h6" component="h3">
                                Personalized Training Plans
                            </Typography>
                            <Typography>
                                Unlock your full potential with customized training programs designed to meet your unique fitness goals. Whether you're a beginner or an advanced athlete, our expert coaches tailor your workouts for maximum effectiveness.
                            </Typography>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem>
                            <Typography variant="h6" component="h3">
                                Nutritional Guidance
                            </Typography>
                            <Typography>
                                Enhance your physical training with personalized nutritional plans that support your fitness goals. Our certified nutritionists create diet plans that complement your lifestyle and boost your performance.
                            </Typography>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
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

            {/* Section with calculation tools */}
            <Section>
                <Typography variant="h4" component="h2" gutterBottom align="center">
                    Calculation Tools
                </Typography>
                <SectionGrid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem onClick={() => navigate('/bmi-calculator')}>
                            <img
                                src={bmi}
                                alt="Body Mass Index"
                                style={{ width: '100%', height: 'auto', marginBottom: 20 }}
                            />
                            <Typography variant="h6" component="h3">
                                Body Mass Index
                            </Typography>
                            <Typography>
                                Determine if your weight is in the normal range for your height.
                            </Typography>
                            <FeatureItemButton>Calculate Now</FeatureItemButton>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem onClick={() => navigate('/water-intake-calculator')}>
                            <img
                                src={water}
                                alt="Daily Water Intake"
                                style={{ width: '100%', height: 'auto', marginBottom: 20 }}
                            />
                            <Typography variant="h6" component="h3">
                                Daily Water Intake
                            </Typography>
                            <Typography>
                                Calculate your daily water intake needs based on your weight and activity level.
                            </Typography>
                            <FeatureItemButton>Calculate Now</FeatureItemButton>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem onClick={() => navigate('/caffeine-intake-calculator')}>
                            <img
                                src={caffeine}
                                alt="Caffeine Intake"
                                style={{ width: '100%', height: 'auto', marginBottom: 20 }}
                            />
                            <Typography variant="h6" component="h3">
                                Caffeine Intake
                            </Typography>
                            <Typography>
                                Calculate your daily Caffeine intake needs based on your weight and activity level.
                            </Typography>
                            <FeatureItemButton>Calculate Now</FeatureItemButton>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem onClick={() => navigate('/calorie-intake-calculator')}>
                            <img
                                src={calorie}
                                alt="Daily Calorie Needs"
                                style={{ width: '100%', height: 'auto', marginBottom: 20 }}
                            />
                            <Typography variant="h6" component="h3">
                                Daily Calorie Needs
                            </Typography>
                            <Typography>
                                Determine how many calories you need to maintain or reach your fitness goals.
                            </Typography>
                            <FeatureItemButton>Calculate Now</FeatureItemButton>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem onClick={() => navigate('/body-fat-percentage-calculator')}>
                            <img
                                src={bodyfat}
                                alt="Body Fat Percentage"
                                style={{ width: '100%', height: 'auto', marginBottom: 20 }}
                            />
                            <Typography variant="h6" component="h3">
                                Body Fat Percentage
                            </Typography>
                            <Typography>
                                Calculate your body fat percentage based on various measurements.
                            </Typography>
                            <FeatureItemButton>Calculate Now</FeatureItemButton>
                        </FeatureItem>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem onClick={() => navigate('/ideal-weight-calculator')}>
                            <img
                                src={idealweight}
                                alt="Ideal Weight"
                                style={{ width: '100%', height: 'auto', marginBottom: 20 }}
                            />
                            <Typography variant="h6" component="h3">
                                Ideal Weight
                            </Typography>
                            <Typography>
                                Find out your ideal weight based on your height and other factors.
                            </Typography>
                            <FeatureItemButton>Calculate Now</FeatureItemButton>
                        </FeatureItem>
                    </Grid>
                </SectionGrid>
            </Section>
        </div>
    );
};

export default LandingPage;
