
import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bmi from '../assets/bmi.jpeg'
import water from '../assets/water-intake.png'
import caffeine from '../assets/caffeine.jpeg';
import calorie from '../assets/calorie.jpeg';
import bodyfat from '../assets/bodyfat.jpeg';
import idealweight from '../assets/idealw.jpeg';
const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <header style={{ textAlign: 'center', margin: '40px 0' }}>
                <Typography variant="h2" component="h1" gutterBottom style={{ color: 'black' }}>
                    Welcome to Your Fitness Journey
                </Typography>
                <Typography variant="h5" component="p" style={{ color: 'black' }}>
                    Achieve your fitness goals with personalized training plans, nutritional guidance, and progress tracking.
                </Typography>
            </header>

            {/* Features Section */}
            <section>
                <Typography variant="h4" component="h2" gutterBottom align="center" style={{ color: 'black' }}>
                    Features
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem
                            title="Personalized Training Plans"
                            description="Unlock your full potential with customized training programs designed to meet your unique fitness goals. Whether you're a beginner or an advanced athlete, our expert coaches tailor your workouts for maximum effectiveness."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem
                            title="Nutritional Guidance"
                            description="Enhance your physical training with personalized nutritional plans that support your fitness goals. Our certified nutritionists create diet plans that complement your lifestyle and boost your performance."
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureItem
                            title="Progress Tracking"
                            description="Stay motivated with real-time tracking of your progress. Our platform provides detailed insights into your workouts, diet, and overall fitness journey, helping you stay on track and achieve your goals faster."
                        />
                    </Grid>
                </Grid>
            </section>

            {/* Calculation Tools Section */}
            <section style={{ marginTop: '40px' }}>
                <Typography variant="h4" component="h2" gutterBottom align="center" style={{ color: 'black' }}>
                    Calculation Tools
                </Typography>
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

