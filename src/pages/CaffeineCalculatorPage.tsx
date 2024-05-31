import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';

const CaffeineIntakeCalculator: React.FC = () => {
    const [weight, setWeight] = useState(40);
    const [caffeineIntake, setCaffeineIntake] = useState<number | null>(null);
    const navigate = useNavigate();

    const calculateCaffeineIntake = () => {
        // Simplified caffeine intake calculation logic
        const intake = weight * 6; // Example calculation: 6 mg of caffeine per kg of body weight
        setCaffeineIntake(intake);
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
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    ml: '-18px',
                                    px: 0,
                                }}
                            >
                                <img
                                    src={logo}
                                    alt="logo of Cardea"
                                    style={{ width: 80, height: 80, borderRadius: '50%' }}
                                    onClick={() => navigate('/')}
                                />
                                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: 'inherit' }}>
                                    Cardea
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Button color="inherit" onClick={() => navigate('/sign-in')}>Sign In</Button>
                                    <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
                                </Box>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>

            <Grid container spacing={4} justifyContent="center" style={{ marginTop: '40px' }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Daily Safe Caffeine Intake Calculation
                            </Typography>
                            <Typography>
                                The daily safe caffeine intake can vary based on a person's age, weight, and health condition. Generally, it is recommended that healthy adults consume no more than 400 milligrams (mg) of caffeine per day. However, some individuals may be more sensitive to caffeine and may require lower amounts.
                            </Typography>
                            <TextField
                                fullWidth
                                label="Weight (KG)"
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                style={{ marginBottom: '20px' }}
                            />
                            <Button variant="contained" color="primary" fullWidth onClick={calculateCaffeineIntake}>
                                Calculate
                            </Button>
                            {caffeineIntake !== null && (
                                <Box mt={4} textAlign="center">
                                    <Typography variant="h5">Your Daily Safe Caffeine Intake: {caffeineIntake} mg</Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" component="h2" gutterBottom style={{ color: 'black' }}>
                        Effects and Risks of Caffeine
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        The daily caffeine intake calculator helps determine the recommended daily caffeine intake for an individual. Caffeine is one of the most consumed and widely used psychoactive substances in the world. Found in coffee, tea, energy drinks, chocolate, and some medications, caffeine is known for its ability to enhance alertness, focus, and energy.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Excessive caffeine consumption can have adverse effects on health. Therefore, it is important to be aware of the risks of caffeine consumption and the recommended daily intake. Many people use caffeine daily, making it crucial to understand its importance and how much should be consumed. However, we often lack adequate knowledge about the appropriate amount and potential risks of excessive caffeine intake. In this article, we will delve into caffeine consumption, its effects, and risks.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        What is Caffeine?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Caffeine is a natural stimulant found in various foods and beverages, including coffee, tea, cola, and chocolate. It is also an active ingredient in many energy drinks. Caffeine is a psychoactive substance that stimulates the nervous system and produces various physiological effects. The maximum recommended daily caffeine intake varies depending on individual factors. The caffeine intake calculator helps determine this amount easily. You can use the daily caffeine intake calculator on our website to find out how much caffeine you should consume daily.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Why is Daily Caffeine Intake Important?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Caffeine plays an indispensable role in many people's daily lives. However, we often do not have enough information about how much caffeine should be consumed. Excessive caffeine intake can lead to various health issues, such as heart palpitations, anxiety, insomnia, headaches, and stomach problems.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Daily caffeine intake can affect sleep, mood, and overall health. While excessive caffeine consumption can cause irritability, restlessness, and insomnia, moderate caffeine consumption can improve cognitive functions and reduce the risk of certain diseases like Parkinson's and Alzheimer's. By using the caffeine intake calculator, you can learn how much caffeine you should consume daily to maintain a healthy lifestyle.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        How to Calculate Daily Caffeine Intake?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Daily caffeine intake depends on various factors, including age, gender, weight, physical activity level, and overall health condition. Generally, it is recommended that an adult's daily caffeine intake should not exceed 400 mg, which is roughly equivalent to 4 cups of coffee. However, pregnant women, children, and individuals with certain health conditions may need to limit their caffeine intake further. The daily caffeine intake calculator helps determine the recommended daily caffeine intake for individuals.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        What is a Caffeine Calculator, and How to Use It?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A caffeine calculator is a tool available on many websites. It calculates the amount of caffeine consumed from foods and beverages. Using a caffeine calculator is quite simple. First, you need to create a list of the foods and beverages you consume. Then, by entering the caffeine content of each item, you can calculate your total caffeine intake. You can use the daily caffeine intake calculator available on our website to quickly and accurately determine your daily caffeine intake.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Foods and Beverages Containing Caffeine
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Caffeine is a widely consumed substance found in many foods and beverages. Here are some common sources of caffeine:
                    </Typography>
                    <ul style={{ color: 'black' }}>
                        <li>Coffee: One of the most common sources of caffeine. A cup of coffee can contain between 50-400 mg of caffeine, depending on the type and preparation method.</li>
                        <li>Tea: Various teas, such as black, green, and white tea, also contain caffeine. A cup of black tea has about 50 mg, while green tea has about 30 mg of caffeine.</li>
                        <li>Cola: Popular soft drinks like cola can have 30-50 mg of caffeine per can (355 ml).</li>
                        <li>Energy Drinks: These often contain caffeine, taurine, and other stimulants. A can (250 ml) of energy drink can have 80-150 mg of caffeine.</li>
                        <li>Chocolate: Many types of chocolate, especially dark chocolate, contain caffeine. 28 grams of dark chocolate can have about 25 mg of caffeine.</li>
                        <li>Pain Relievers: Some pain relievers, especially non-steroidal anti-inflammatory drugs (NSAIDs) like aspirin, ibuprofen, and naproxen, contain caffeine. These usually have about as much caffeine as a cup of coffee.</li>
                    </ul>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Benefits of Caffeine
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        While excessive caffeine consumption can be harmful, moderate amounts have several benefits. Research indicates the following benefits of caffeine:
                    </Typography>
                    <ul style={{ color: 'black' }}>
                        <li>Enhances alertness and focus</li>
                        <li>Improves physical performance</li>
                        <li>Reduces fatigue related to sleep apnea and other respiratory disorders</li>
                        <li>May help reduce the risk of depression and suicidal tendencies</li>
                        <li>Boosts energy levels</li>
                        <li>May reduce the risk of neurological diseases like Parkinson's and Alzheimer's</li>
                        <li>Can lower the risk of diseases such as asthma, diabetes, and liver cancer</li>
                    </ul>
                    <Typography paragraph style={{ color: 'black' }}>
                        However, it is important to note that these benefits can also be achieved with lower caffeine intake.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Risks of Caffeine Intake
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Excessive caffeine intake comes with several risks, including:
                    </Typography>
                    <ul style={{ color: 'black' }}>
                        <li>Insomnia: Caffeine's stimulant effect can reduce sleep quality</li>
                        <li>Anxiety: Caffeine can increase anxiety levels and trigger feelings of nervousness</li>
                        <li>Digestive issues: Caffeine can cause gas and indigestion</li>
                        <li>Heart health: Caffeine can increase heart rate and blood pressure</li>
                        <li>Bone health: Caffeine can reduce bone mineral density and increase the risk of osteoporosis</li>
                        <li>Pregnancy: High caffeine intake can increase the risk of low birth weight and preterm birth</li>
                    </ul>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Benefits of a Caffeine Calculator
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A caffeine calculator helps monitor your daily caffeine intake and reduce the risk of excessive consumption. It provides a list of foods and beverages containing caffeine and their respective caffeine amounts, helping you keep track of your total caffeine intake.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Visit Cardea.com to use our daily caffeine intake calculator and learn how much caffeine you should consume daily. Get information about our services and personal training support from Our Coaches by visiting our website now.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CaffeineIntakeCalculator;
