import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
    CardMedia,
    AppBar,
    Box,
    Toolbar,
    MenuItem, Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bmi from '../assets/builder.png'
import water from '../assets/water.png'
import caffeine from '../assets/coffee.png';
import calorie from '../assets/calorie.png';
import bodyfat from '../assets/bodyfat.png';
import idealweight from '../assets/idealWeight.png';
import trainingImage from '../assets/trainingImage.png';
import nutritionImage from '../assets/nutrition.png';
import progressImage from '../assets/progress.png';
import logo from '../assets/CardeaLogo.png';
import banner from '../assets/banner.png';
import features from '../assets/features.png';
import calcTools from '../assets/calculation.png';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import { useUser } from '../context/UserContext';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [profilePicture, setProfilePicture] = useState<string>('');

    useEffect(() => {
        const fetchProfilePicture = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/user/profile-picture', { withCredentials: true });
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
            await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/'); // Redirect to the landing page after logout
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


    const FeatureItem: React.FC<{ title: string; description: string; imgSrc: string }> = ({ title, description, imgSrc }) => (
        <Card style=
            {{ maxWidth: 400, margin: 'auto' }}>
            <CardMedia
                component="img"
                height="400"
                image={imgSrc}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card >
    );

    return (
        <Container>
            <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}>
                <Container maxWidth="lg">
                    <Toolbar variant="regular" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '999px', bgcolor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(24px)', maxHeight: 56, border: '1px solid', borderColor: 'divider', padding: '0 24px' }}>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="logo of Cardea" style={{ width: 80, height: 80, borderRadius: '50%' }} />
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', ml: 4 }}>
                                <MenuItem onClick={() => handleNavigate('workout')}>
                                    <Typography variant="body1" color="text.primary">Workouts</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => handleNavigate('diet')}>
                                    <Typography variant="body1" color="text.primary">Diet Plans</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => handleNavigate('photo')}>
                                    <Typography variant="body1" color="text.primary">Body Transformation</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/recipes')}>
                                    <Typography variant="body1" color="text.primary">Recipes</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/about')}>
                                    <Typography variant="body1" color="text.primary">About Us</Typography>
                                </MenuItem>
                            </Box>
                            <Avatar src={profilePicture} sx={{ width: 40, height: 40 }} onClick={() => navigate('/profile')} />
                            <Button
                                onClick={handleLogout}
                                startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft: '20px' }} />} // You can adjust the size here
                            >
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <header style={{ textAlign: 'center', margin: '40px 0', marginTop: '85px' }}>
                <img src={banner} alt="Fitness Journey Banner" style={{ width: '100%', height: 'auto' }} />
            </header>

            {/* Features Section */}
            <section>
                <Typography variant="h4" component="h2" gutterBottom align="center" style={{ color: 'black' }}>
                    <img src={features} alt="Features" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem
                            imgSrc={trainingImage}
                            title="Personalized Training Plans"
                            description="Unlock your full potential with customized training programs designed to meet your unique fitness goals. Whether you're a beginner or an advanced athlete, our expert coaches tailor your workouts for maximum effectiveness."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem
                            imgSrc={nutritionImage}
                            title="Nutritional Guidance"
                            description="Enhance your physical training with personalized nutritional plans that support your fitness goals. Our certified nutritionists create diet plans that complement your lifestyle and boost your performance."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem
                            imgSrc={progressImage}
                            title="Progress Tracking"
                            description="Stay motivated with real-time tracking of your progress. Our platform provides detailed insights into your workouts, diet, and overall fitness journey, helping you stay on track and achieve your goals faster."
                        />
                    </Grid>
                </Grid>
            </section>

            {/* Calculation Tools Section */}
            <section style={{ marginTop: '40px' }}>
                <img src={calcTools} alt="Features" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <CalculationTool
                            imgSrc={bmi}
                            altText="Body Mass Index"
                            title="Body Mass Index"
                            description="Determine if your weight is in the normal range for your height."
                            onClick={() => navigate('/bmi-calculator')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <CalculationTool
                            imgSrc={water}
                            altText="Daily Water Intake"
                            title="Daily Water Intake"
                            description="Calculate your daily water intake needs based on your weight and activity level."
                            onClick={() => navigate('/water-intake-calculator')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <CalculationTool
                            imgSrc={caffeine}
                            altText="Caffeine Intake"
                            title="Caffeine Intake"
                            description="Calculate your daily Caffeine intake needs based on your weight and activity level."
                            onClick={() => navigate('/caffeine-intake-calculator')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <CalculationTool
                            imgSrc={calorie}
                            altText="Daily Calorie Needs"
                            title="Daily Calorie Needs"
                            description="Determine how many calories you need to maintain or reach your fitness goals."
                            onClick={() => navigate('/calorie-intake-calculator')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <CalculationTool
                            imgSrc={bodyfat}
                            altText="Body Fat Percentage"
                            title="Body Fat Percentage"
                            description="Calculate your body fat percentage based on various measurements."
                            onClick={() => navigate('/body-fat-percentage-calculator')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <CalculationTool
                            imgSrc={idealweight}
                            altText="Ideal Weight"
                            title="Ideal Weight"
                            description="Find out your ideal weight based on your height and other factors."
                            onClick={() => navigate('/ideal-weight-calculator')}
                        />
                    </Grid>
                </Grid>
            </section>
        </Container>
    );
};

const FeatureItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div style={{ padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
        <Typography variant="h6" component="h3" gutterBottom style={{ color: 'black' }}>
            {title}
        </Typography>
        <Typography style={{ color: 'black' }}>{description}</Typography>
    </div>
);

const CalculationTool: React.FC<{ imgSrc: string; altText: string; title: string; description: string; onClick: () => void }> = ({ imgSrc, altText, title, description, onClick }) => (
    <div onClick={onClick} style={{ cursor: 'pointer', padding: '20px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px' }}>
        <img src={imgSrc} alt={altText} style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
        <Typography variant="h6" component="h3" gutterBottom style={{ color: 'black' }}>
            {title}
        </Typography>
        <Typography style={{ color: 'black' }}>{description}</Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Calculate Now
        </Button>
    </div>
);

export default LandingPage;
