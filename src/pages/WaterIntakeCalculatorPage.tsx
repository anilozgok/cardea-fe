import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box, MenuItem, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';

const WaterIntakeCalculator: React.FC = () => {
    const [age, setAge] = useState(14);
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState(140);
    const [weight, setWeight] = useState(40);
    const [activityLevel, setActivityLevel] = useState('Sedentary');
    const [waterIntake, setWaterIntake] = useState<number | null>(null);
    const navigate = useNavigate();

    const calculateWaterIntake = () => {
        // Simplified water intake calculation logic
        const baseIntake = 2;
        const activityMultiplier = activityLevel === 'Active' ? 1.2 : activityLevel === 'Very Active' ? 1.4 : 1;
        const intake = baseIntake * activityMultiplier;
        setWaterIntake(intake);
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
                                Daily Water Intake Calculation
                            </Typography>
                            <Typography>
                                Calculate your daily water intake based on your age, gender, height, weight, and activity level.
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
                            <TextField
                                fullWidth
                                select
                                label="Activity Level"
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                                style={{ marginBottom: '20px' }}
                            >
                                <MenuItem value="Sedentary">Sedentary</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Very Active">Very Active</MenuItem>
                            </TextField>
                            <Button variant="contained" color="primary" fullWidth onClick={calculateWaterIntake}>
                                Calculate
                            </Button>
                            {waterIntake !== null && (
                                <Box mt={4} textAlign="center">
                                    <Typography variant="h5">Your Daily Water Intake: {waterIntake} liters</Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" component="h2" gutterBottom style={{ color: 'black' }}>
                        Importance of Water Intake
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Using a daily water intake calculator helps determine the amount of water you need to consume each day. Water is vital for our survival and for the proper functioning of our body. To function properly, all the cells and organs of the body need water.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Adequate water intake is essential for a healthy lifestyle and for our physiological functions to work correctly. Therefore, understanding your daily water needs and tracking your water intake is important. Let's explore the importance of water intake, the benefits of using a water intake calculator, and other important aspects of hydration.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Why is Water Important?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Water performs many critical functions in our bodies. It regulates body temperature, moisturizes tissues, transports nutrients to cells, and supports organ function. Additionally, it helps remove waste from the kidneys and facilitates bowel movements.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Drinking enough water helps maintain fluid balance in the body and reduces the risk of dehydration. Dehydration can lead to serious health issues such as kidney stones, urinary tract infections, constipation, headaches, fatigue, and concentration problems. Using a hydration calculator can help you easily determine how much water you should drink daily.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        What Factors Affect Water Needs?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Water needs depend on various factors, including age, gender, physical activity level, body weight, and environmental conditions.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Age: Older adults need less water than younger and middle-aged individuals. In older adults, the thirst reflex decreases, and the kidneys' ability to conserve water diminishes.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Gender: Men typically need more water than women. Therefore, men's daily water requirements are higher than women's.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Physical activity level: Active individuals need more water than inactive individuals. Exercise increases sweat loss, and it is essential to replace the lost fluids.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Body weight: As body weight increases, water needs also increase. Additionally, obese individuals have faster metabolisms and need more water.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Environmental conditions: Hot and high-altitude regions require more water intake. Sweating is more frequent in these areas, leading to increased water loss.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        How to Calculate Daily Water Needs?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Daily water needs depend on various factors. Generally, an adult's daily water requirement is between 2-3 liters. However, this amount can vary based on age, gender, physical activity level, body weight, and environmental conditions.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Many experts recommend the "8x8 rule" for calculating daily water needs. According to this rule, it is advised to drink at least 8 glasses (about 2 liters) of water each day. However, this is just a general guideline, and everyone's water needs can differ. You can use the daily water intake calculator on Cardea.com to determine your body's water requirements.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        What is a Water Intake Calculator, and How to Use It?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A water intake calculator is a tool that helps individuals calculate their daily water needs. This tool calculates water requirements based on a person's age, gender, physical activity level, and body weight.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Using a water intake calculator is very simple. Many different water intake calculators are available online. By selecting one of these tools and entering your age, gender, physical activity level, and body weight, you can calculate your daily water needs.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Signs of Dehydration and Its Dangers
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Signs of dehydration occur when the body loses water. These symptoms include thirst, dry mouth, headaches, fatigue, concentration problems, dark urine, and excessive sweating.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Dehydration can lead to various health issues. It can cause kidney stones, urinary tract infections, constipation, headaches, fatigue, concentration problems, and even heart attacks. By using a water intake calculator, you can learn how much water you need to consume to ensure your health.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Tips for Meeting Water Needs
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Here are some tips for meeting your water needs:
                    </Typography>
                    <ul style={{ color: 'black' }}>
                        <li>Make sure to drink at least 8 glasses of water daily.</li>
                        <li>Try to drink more water during exercise.</li>
                        <li>Drink more water in hot weather.</li>
                        <li>Remember that tea, coffee, and alcoholic beverages can cause dehydration, so consider them separately from your water intake.</li>
                        <li>Consume fruits and vegetables with high water content.</li>
                        <li>Schedule your water intake, for example, by aiming to drink a glass of water every hour.</li>
                    </ul>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Misconceptions About Water Intake
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        There are many misconceptions about water intake. Here are a few:
                    </Typography>
                    <ul style={{ color: 'black' }}>
                        <li>Drinking water hydrates the skin: Using moisturizing products is more effective for hydrating the skin. However, adequate water intake can help keep the skin healthy.</li>
                        <li>You should only drink water when you're thirsty: Try to meet your body's water needs before you feel thirsty. Drinking water before you get thirsty helps your body prepare better against dehydration.</li>
                        <li>You should only drink plain water: Fruits and vegetables, as well as other liquid foods, can also meet your body's water needs.</li>
                        <li>You should drink the same amount of water every day: Water needs can vary daily. Therefore, adjust your daily water intake based on environmental factors, lifestyle, and personal needs.</li>
                    </ul>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Benefits of a Water Intake Calculator
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A water intake calculator provides many benefits. By using this tool, you can calculate your daily water needs and learn the amount of water required for a healthy life. Additionally, this tool helps regulate your water consumption and meet your water needs for a healthy lifestyle.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        The water intake calculator also dispels misconceptions about water consumption. With this tool, individuals can learn their daily water needs and regulate their water consumption accordingly for a healthy lifestyle.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Visit Cardea.com and use the daily water intake calculator to learn how much water you need to consume daily.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default WaterIntakeCalculator;
