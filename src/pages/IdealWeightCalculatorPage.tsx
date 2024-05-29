import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, TextField, Button, Typography, MenuItem, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';

const IdealWeightCalculator: React.FC = () => {
    const [age, setAge] = useState(14);
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState(140);
    const [idealWeight, setIdealWeight] = useState<number | null>(null);
    const navigate = useNavigate();

    const calculateIdealWeight = () => {
        // Simplified ideal weight calculation logic
        const baseWeight = gender === 'Male' ? 50 : 45.5;
        const weight = baseWeight + 0.91 * (height - 152.4);
        setIdealWeight(weight);
    };

    return (
        <Container>
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

            <Grid container spacing={4} justifyContent="center" style={{ marginTop: '40px' }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Ideal Weight Calculation
                            </Typography>
                            <Typography>
                                Ideal weight is the body weight considered appropriate for maintaining a healthy life based on a person's age, height, gender, and body type. Each person's ideal weight can vary because it depends on body composition and metabolic rate. For example, a person with more muscle mass may have a higher ideal weight than someone with less muscle mass.
                            </Typography>
                            <TextField
                                fullWidth
                                label="Age"
                                type="number"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                                style={{ marginBottom: '20px' }}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                style={{ marginBottom: '20px' }}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                label="Height (CM)"
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                style={{ marginBottom: '20px' }}
                            />
                            <Button variant="contained" color="primary" fullWidth onClick={calculateIdealWeight}>
                                Calculate
                            </Button>
                            {idealWeight !== null && (
                                <Typography mt={4} textAlign="center" variant="h5">
                                    Your Ideal Weight: {idealWeight.toFixed(2)} KG
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" component="h2" gutterBottom style={{ color: 'black' }}>
                        Importance of Ideal Weight
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Ideal weight is the body weight considered appropriate for maintaining a healthy life based on a person's age, height, gender, and body type. Each person's ideal weight can vary because it depends on body composition and metabolic rate. For example, a person with more muscle mass may have a higher ideal weight than someone with less muscle mass.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        How to Calculate Ideal Weight?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Ideal weight can be calculated using several methods. Some of these include:
                    </Typography>
                    <ul style={{ color: 'black' }}>
                        <li>Body Mass Index (BMI): A widely used method that uses height and weight to estimate ideal body weight.</li>
                        <li>Hamwi Formula: A formula that estimates ideal body weight based on height and gender.</li>
                        <li>Devine Formula: Similar to the Hamwi formula but slightly modified for better accuracy.</li>
                    </ul>
                    <Typography paragraph style={{ color: 'black' }}>
                        Using these formulas, you can estimate your ideal weight. For example, the Hamwi formula for men is: Ideal weight (kg) = 48 + 2.7 * (height (cm) - 152). For women, it is: Ideal weight (kg) = 45.5 + 2.2 * (height (cm) - 152).
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Benefits of Maintaining Ideal Weight
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Maintaining an ideal weight is crucial for overall health. It helps reduce the risk of chronic diseases, improves physical performance, and enhances mental well-being. By staying within the ideal weight range, you can ensure a healthier and more active lifestyle.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Visit Cardea.com to use our ideal weight calculator and learn more about maintaining a healthy lifestyle. Get information about our services and personal training support from Baran Kalaycı by visiting our website now.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default IdealWeightCalculator;
