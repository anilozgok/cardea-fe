import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box, MenuItem, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';
import React, { useState, useEffect } from 'react';
import logoName from '../assets/cardeaName.png';

const BodyFatCalculator: React.FC = () => {
    const [age, setAge] = useState(14);
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState(140);
    const [weight, setWeight] = useState(40);
    const [bodyFat, setBodyFat] = useState<number | null>(null);
    const navigate = useNavigate();

    const calculateBodyFat = () => {
        // Simplified body fat calculation logic
        const baseFat = gender === 'Male' ? 0.1 : 0.2;
        const fat = baseFat * (weight / ((height / 100) * (height / 100)));
        setBodyFat(fat * 100);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            </AppBar>


            <Grid container spacing={4} justifyContent="center" style={{ marginTop: '40px' }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Body Fat Percentage Calculation
                            </Typography>
                            <Typography>
                                Body fat percentage is the proportion of fat in your body relative to your total body weight. It is an important factor in determining your health status and appropriate nutrition, exercise, and lifestyle habits. Generally, 6-24% is considered normal for men, while 16-30% is considered normal for women. However, these ranges can vary based on age, gender, genetic characteristics, muscle mass, metabolism rate, and lifestyle habits.
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
                            <Button variant="contained" color="primary" fullWidth onClick={calculateBodyFat}>
                                Calculate
                            </Button>
                            {bodyFat !== null && (
                                <Box mt={4} textAlign="center">
                                    <Typography variant="h5">Your Body Fat Percentage: {bodyFat.toFixed(2)}%</Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" component="h2" gutterBottom style={{ color: 'black' }}>
                        Importance and Effects of Body Fat Percentage
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Body fat percentage is the proportion of fat content in the body relative to total body weight. It is an important indicator of health because excessive fat storage can lead to obesity and various health problems. A high body fat percentage increases the risk of heart disease, high blood pressure, diabetes, cancer, and many other health issues. Therefore, maintaining a low body fat percentage is crucial for a healthy life and a healthy body.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Determining the ideal fat percentage is made easier with the body fat percentage calculation tool. You can quickly calculate your body fat percentage with body fat percentage calculators. In this article, we cover the importance of body fat percentage, the body fat percentage calculation tool used for fat measurement, and methods for measuring body fat percentage. Enjoy reading and stay healthy!
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        How to Calculate Body Fat Percentage?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Body fat percentage can be calculated using several different methods. Some of these include:
                    </Typography>
                    <ul style={{ color: 'black' }}>
                        <li>Skinfold thickness: This method uses a special tool to measure the thickness of skin folds. Measurements can be taken at different body sites, and results are calculated using a specific formula.</li>
                        <li>Bioelectrical impedance: This method measures the body's electrical conductivity through a device. The amount of fat in the body is related to electrical resistance.</li>
                        <li>Water displacement: This method estimates body fat percentage by measuring the body's water content.</li>
                        <li>DEXA scan: This method uses X-rays to measure the detailed composition of fat, bone, and muscle mass in the body.</li>
                    </ul>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        What is a Body Fat Percentage Calculator, and How to Use It?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A body fat percentage calculator is an online tool used to determine a person's body fat percentage. These tools usually use methods like skinfold thickness, bioelectrical impedance, or water displacement to calculate results. Using these tools is quite simple. By entering specific measurements and following certain instructions, you can get results. You can quickly learn your fat percentage using the body fat percentage calculator available on our website.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Adjustability of Body Fat Percentage and Healthy Body Fat Goals
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Body fat percentage can be adjusted with lifestyle factors such as diet and exercise. A healthy body fat goal depends on a person's age, gender, genetic characteristics, and lifestyle. Generally, a body fat percentage of 6-24% for men and 16-30% for women is considered ideal. For men, 14-17% is classified as fit and 18-24% as average, while for women, 21-24% is fit and 25-31% is average.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        To reduce body fat percentage, regular exercise, a healthy diet, and weight loss are recommended. It is also important to avoid rapid weight loss and extreme diets. A slow and sustainable diet and exercise plan helps reduce body fat percentage. You can quickly learn about your ideal body fat percentage using the body fat percentage calculator.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Relationship Between Body Fat Percentage and Muscle Mass
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Body fat percentage and muscle mass are closely related. As body fat percentage increases, muscle mass may decrease. Similarly, as muscle mass increases, body fat percentage may decrease. Regular exercise can increase muscle mass and reduce body fat percentage. You can track the balance of fat and muscle using the body fat-muscle ratio calculator.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Muscle mass is a significant factor that increases metabolic rate and helps the body burn fat. Therefore, reducing body fat percentage and increasing muscle mass is crucial for a healthy body. Free fat percentage calculation tools can help you learn your ideal body fat percentage.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Methods for Measuring Body Fat Percentage
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        There are many methods to measure body fat percentage. These methods include skinfold thickness, bioelectrical impedance, water displacement, and DEXA scanning. The most accurate method is underwater weighing, also known as hydrostatic weighing. However, this method is not very practical and is expensive. Each method has its unique advantages and disadvantages. For example, skinfold thickness measurements are easy to perform but may have variable accuracy. DEXA scans provide the most accurate results but are more costly and involve radiation. Practical methods include bioelectrical impedance analysis (BIA), skinfold thickness measurements, air displacement plethysmography, and magnetic resonance imaging (MRI). Each of these methods measures body fat percentage differently and provides varying levels of accuracy.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Symptoms and Risks of High Body Fat Percentage
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A high body fat percentage increases the risk of obesity, heart disease, high blood pressure, diabetes, cancer, and many other health issues. High body fat percentage can also limit physical activity and daily activities. Additionally, it can lead to various conditions that negatively affect overall health, such as reduced energy levels.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Symptoms of a high body fat percentage include fat accumulation around the abdomen, difficulty breathing, frequent fatigue, joint pain, sleep apnea, skin problems, hormonal imbalances, and depression. These symptoms indicate health risks and should be taken as a warning to reduce body fat percentage.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Benefits of a Body Fat Percentage Calculator
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A body fat percentage calculator helps individuals gain information about their health status. By calculating their body fat percentage, individuals can set a healthy body fat goal. The body fat percentage calculator helps individuals adjust their diet and exercise plans and encourages healthy lifestyle choices. Additionally, because the body fat percentage calculator uses various measurement methods, it helps individuals learn about the advantages and disadvantages of different methods.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Visit Cardea.com to use our body fat percentage calculator and take an important step towards a healthy life. Get information about our services and personal training support from Baran Kalaycı by visiting our website now.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BodyFatCalculator;
