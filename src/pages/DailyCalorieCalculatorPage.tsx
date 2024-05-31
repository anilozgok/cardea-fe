import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box, MenuItem, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CardeaLogo.png';

const CalorieIntakeCalculator: React.FC = () => {
    const [age, setAge] = useState(14);
    const [gender, setGender] = useState('Male');
    const [height, setHeight] = useState(140);
    const [weight, setWeight] = useState(40);
    const [activityLevel, setActivityLevel] = useState('Sedentary');
    const [calorieIntake, setCalorieIntake] = useState<number | null>(null);
    const navigate = useNavigate();

    const calculateCalorieIntake = () => {
        // Simplified calorie intake calculation logic
        const baseIntake = gender === 'Male' ? 2500 : 2000;
        const activityMultiplier = activityLevel === 'Very Active' ? 1.4 : activityLevel === 'Active' ? 1.2 : 1;
        const intake = baseIntake * activityMultiplier;
        setCalorieIntake(intake);
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
                                Daily Calorie Intake Calculation
                            </Typography>
                            <Typography>
                                A person's daily calorie needs can vary based on age, gender, height, weight, and activity level. On average, an adult male needs around 2000-2500 calories per day, while a female needs around 1500-2000 calories per day. However, these are just average values and can change based on individual needs.
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
                                <MenuItem value="Sedentary">Sedentary (Little or no exercise)</MenuItem>
                                <MenuItem value="Lightly Active">Lightly Active (Light exercise/sports 1-3 days/week)</MenuItem>
                                <MenuItem value="Moderately Active">Moderately Active (Moderate exercise/sports 3-5 days/week)</MenuItem>
                                <MenuItem value="Very Active">Very Active (Hard exercise/sports 6-7 days a week)</MenuItem>
                                <MenuItem value="Super Active">Super Active (Very hard exercise/sports & a physical job)</MenuItem>
                            </TextField>
                            <Button variant="contained" color="primary" fullWidth onClick={calculateCalorieIntake}>
                                Calculate
                            </Button>
                            {calorieIntake !== null && (
                                <Box mt={4} textAlign="center">
                                    <Typography variant="h5">Your Daily Calorie Needs: {calorieIntake} KCal/Day</Typography>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" component="h2" gutterBottom style={{ color: 'black' }}>
                        Why is Calorie Intake Important?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        The daily calorie intake calculator is often used by people who are dieting. Calories are essential to meet the body's energy needs. Body functions, brain activities, and physical activities require energy, which is supplied by the calories obtained from food. To maintain a healthy lifestyle and manage weight, it is important to consume the right amount of calories.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Calorie needs can vary based on many factors, including age, gender, weight, height, activity level, metabolic rate, and genetic factors. In this article, we discuss calorie needs, the importance of calorie calculation, healthy eating, calorie balance, and the calorie calculator. Enjoy reading and stay healthy!
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Why is Calorie Intake Important?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        The primary importance of calories is to provide the energy required for the body to function healthily. The body burns the necessary nutrients for energy, and the calorie value of these nutrients is the source of the energy the body needs. If the body consumes fewer calories than it needs, energy sources are depleted, affecting body functions. Similarly, if the body consumes more calories than it needs, the excess energy is stored as fat, leading to weight gain. By using the daily calorie calculator, you can easily calculate your personal calorie needs.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        How to Calculate Daily Calorie Needs?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Daily calorie needs vary based on age, gender, weight, height, and activity level. An average adult woman needs about 2000-2200 calories per day, while an average adult man needs about 2500-2700 calories per day. However, considering factors such as age, weight, height, gender, and activity level, calculating individually provides more accurate results. Generally, to determine a person's daily calorie needs, basal metabolic rate calculations are made. Basal metabolic rate refers to the amount of energy the body consumes while at rest. Many formulas are available for these calculations, such as the Harris-Benedict formula. You can quickly calculate the daily amount of calories you need to consume using our website's calorie need calculator and obtain reliable results.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        What is a Calorie Calculator, and How to Use It?
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A calorie calculator is a tool used to calculate a person's daily calorie needs. These tools calculate calorie needs based on a person's age, gender, weight, height, and activity level. These calculators are available online and offered by various health sites. To use them, simply enter the required information and click the calculate button. With this nutrition tool, you can learn about the daily amount of calories your body needs.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Caloric Values of Foods and Their Importance
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        The caloric values of foods are important for healthy eating and weight control. The caloric values of foods are the source of energy needed for the body. The calorie value of foods determines the amount of energy taken. Some foods have high-calorie values, and consuming these foods in excess can lead to fat accumulation in the body. Therefore, it is important to prefer low-calorie foods for a healthy diet.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Different food groups like proteins, carbohydrates, and fats have different caloric values. For example, proteins and carbohydrates provide 4 calories per gram, while fats provide 9 calories per gram. Therefore, considering the caloric values of foods is important for weight control and healthy eating. By using the calorie-burning calculator, you can track the daily amount of calories you need to consume and learn about the calories in the foods you consume.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        The Relationship Between Physical Activity and Calorie Consumption
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Physical activity helps increase calorie consumption and aids in weight loss. Exercising not only strengthens muscles but also helps the body burn more calories. By exercising, body fat percentage decreases, and muscle mass increases. As a result, the body burns more calories, leading to weight loss.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Physical activity increases a person's daily calorie needs. The higher the activity level, the more energy the person needs. Regular exercise increases the body's fat-burning capacity and helps in weight control. At the same time, physical activity helps maintain muscle mass and increases metabolism, leading to more calories being burned.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Factors Affecting Calorie Needs
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Calorie needs are determined by many factors, including age, gender, weight, height, activity level, metabolic rate, and genetic factors. As age increases, metabolism slows down, reducing calorie needs. Similarly, as weight increases, the amount of energy the body needs also increases.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Gender also affects calorie needs. Men, having more muscle mass, consume more calories. Weight and height are also important in determining calorie needs. Activity level plays a significant role in determining calorie needs. A more active lifestyle leads to higher calorie burning. By using the calorie calculator, you can learn about your calorie needs and prepare a nutrition plan similar to your exercise plan.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        Variability and Updating of Calorie Needs
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Calorie needs can change over time, and updating them is important. For example, weight loss or muscle mass gain can affect calorie needs. Additionally, the aging process can also affect calorie needs. Therefore, it is important to regularly review and update calorie needs.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A person's daily calorie needs can vary based on age, gender, weight, height, activity level, and metabolic rate. Therefore, once a person's calorie needs are determined, they should be regularly updated. Especially for individuals with weight loss or gain goals, changes in body weight or activity level can affect daily calorie needs. Therefore, it is important for individuals to regularly calculate their calorie needs and adjust their nutrition accordingly.
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom style={{ color: 'black' }}>
                        The Relationship Between Healthy Eating and Calorie Balance
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Healthy eating is important for maintaining calorie balance. Calorie balance means that the calories consumed are balanced with the calories burned. If the consumed calories exceed the burned calories, fat accumulation occurs in the body, leading to weight gain. Therefore, when creating a healthy diet plan, calorie balance should be considered. Low-calorie foods should be preferred, and the consumption of high-calorie foods should be limited. Additionally, to create a healthy diet plan, sufficient amounts of all food groups should be consumed. High-protein and high-fiber foods should be preferred. Using the nutrition calculator can easily maintain calorie balance.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        A healthy nutrition program is about meeting a person's daily calorie needs and balancing the necessary nutrients for the body. This program includes sufficient amounts of protein, carbohydrates, fats, vitamins, and minerals. It is recommended to avoid high-calorie and low-nutrient foods like fast food and ready-to-eat meals.
                    </Typography>
                    <Typography paragraph style={{ color: 'black' }}>
                        Visit our website to use the calorie needs calculator and learn about the daily amount of calories you need to consume. Get information about our services and personal training support from Baran Kalaycı by visiting our website now.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CalorieIntakeCalculator;
