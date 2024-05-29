import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box, MenuItem, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';

const BMICalculator: React.FC = () => {
    const [age, setAge] = useState(14);
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState(140);
    const [weight, setWeight] = useState(40);
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmiCategory, setBmiCategory] = useState<string | null>(null);
    const navigate = useNavigate();

    const calculateBMI = () => {
        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBmi(bmiValue);
        if (bmiValue < 18.5) setBmiCategory('Underweight');
        else if (bmiValue < 24.9) setBmiCategory('Normal');
        else if (bmiValue < 29.9) setBmiCategory('Overweight');
        else setBmiCategory('Obese');
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
                                BMI Calculator
                            </Typography>
                            <Typography>
                                BMI (Body Mass Index) is a measure used to determine if a person's weight is normal based on their height.
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
                            <TextField
                                fullWidth
                                label="Weight (KG)"
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                style={{ marginBottom: '20px' }}
                            />
                            <Button variant="contained" color="primary" fullWidth onClick={calculateBMI}>
                                Calculate
                            </Button>
                            {bmi !== null && (
                                <Box mt={4} textAlign="center">
                                    <Typography variant="h5">Your BMI is {bmi.toFixed(2)}</Typography>
                                    <Typography variant="h6">Category: {bmiCategory}</Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography style={{ color: 'black' }} variant="h4" component="h2" gutterBottom>
                        Why is BMI Important?
                    </Typography>
                    <Typography style={{ color: 'black' }}paragraph>
                        BMI (Body Mass Index) is a method used to determine if a person's body weight is normal based on their height. It provides an indication of body fatness and is used to screen for weight categories that may lead to health problems.
                    </Typography>
                    <Typography style={{ color: 'black' }} variant="h5" component="h3" gutterBottom>
                        What is BMI?
                    </Typography>
                    <Typography  style={{ color: 'black' }}paragraph>
                        BMI is a measure of body fat based on height and weight that applies to adult men and women. It is calculated by dividing a person's weight in kilograms by the square of their height in meters. For example, a person who weighs 70 kg and is 1.75 meters tall has a BMI of 22.9.
                    </Typography>
                    <Typography style={{ color: 'black' }} variant="h5" component="h3" gutterBottom>
                        How is BMI Calculated?
                    </Typography>
                    <Typography style={{ color: 'black' }} paragraph>
                        The formula to calculate BMI is:
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        <strong>BMI = Weight (kg) / (Height (m) x Height (m))</strong>
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        For example, if a person weighs 70 kg and their height is 1.75 meters, the BMI calculation is as follows:
                    </Typography>
                    <Typography style={{ color: 'black' }} paragraph>
                        <strong>BMI = 70 / (1.75 x 1.75) = 22.9</strong>
                    </Typography>
                    <Typography style={{ color: 'black' }} variant="h5" component="h3" gutterBottom>
                        BMI Categories
                    </Typography>
                    <Typography style={{ color: 'black' }} paragraph>
                        According to the BMI calculation, the following categories are used to evaluate the results:
                    </Typography >
                    <ul style={{ color: 'black' }}>
                        <li>Underweight: BMI less than 18.5</li>
                        <li>Normal weight: BMI 18.5–24.9</li>
                        <li>Overweight: BMI 25–29.9</li>
                        <li>Obese: BMI 30 or greater</li>
                    </ul>
                    <Typography style={{ color: 'black' }} variant="h5" component="h3" gutterBottom>
                        Health Implications of BMI
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }} >
                        A high BMI can indicate high body fatness. BMI is a screening measure and is not intended to diagnose the body fatness or health of an individual. People with high BMI are at an increased risk of developing conditions such as heart disease, high blood pressure, type 2 diabetes, gallstones, breathing problems, and certain cancers.
                    </Typography>
                    <Typography style={{ color: 'black' }} variant="h5" component="h3" gutterBottom>
                        Tips for Maintaining a Healthy BMI
                    </Typography>
                    <Typography style={{ color: 'black' }} paragraph>
                        To maintain a healthy BMI, it is important to engage in regular physical activity, eat a balanced diet, and avoid high-calorie, low-nutrient foods. Consulting with healthcare providers for personalized advice can also be beneficial.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BMICalculator;
