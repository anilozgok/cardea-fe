import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    Modal,
    IconButton, AppBar, Toolbar, MenuItem, Avatar
} from '@mui/material';
import axiosInstance from '../types/Recipe';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../assets/CardeaLogo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface Recipe {
    ID: string;
    title: string;
    ingredients: string[];
    instructions: string;
}

const RecipesPage: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [initialRecipes, setInitialRecipes] = useState<Recipe[]>([]);
    const [profilePicture, setProfilePicture] = useState<string>('');

    useEffect(() => {
        const fetchProfilePicture = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/v1/user/profile-picture', { withCredentials: true });
            if (response.data && response.data.photoURL) {
              setProfilePicture(response.data.photoURL);
            }
          } catch (error) {
            console.error('Failed to fetch profile picture:', error);
          }
        };
    
        fetchProfilePicture();
    
        
      }, []);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await axiosInstance.get('/recipes');
            if (response.data && typeof response.data === 'object') {
                const recipesArray = Object.keys(response.data).map(key => ({
                    ID: key,
                    ...response.data[key]
                }));
                setRecipes(recipesArray);
                setInitialRecipes(recipesArray.slice(0, 10)); // Show first 10 recipes initially
            }
        } catch (error) {
            console.error('Failed to fetch recipes', error);
        }
    };
    const navigate = useNavigate();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRecipeClick = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRecipe(null);
    };

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const recipesToShow = searchTerm ? filteredRecipes : initialRecipes;
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <Container>

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
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={logo}
                                alt="logo of Cardea"
                                style={{ width: 80, height: 80, borderRadius: '50%' }}
                                onClick={() => navigate('/landing')}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
                            <MenuItem onClick={() => navigate('/landing')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Home
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/diet-plan-user')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Diet Plans
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/workouts')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Workouts
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={profilePicture} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                        </Box>
                        <Button
                            onClick={handleLogout}
                            startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft: '20px' }} />}
                        >
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box display="flex" justifyContent="center" my={4}>
                <Typography variant="h4">Search for Food Recipes</Typography>
            </Box>
            <TextField
                fullWidth
                label="Search Recipes"
                value={searchTerm}
                onChange={handleSearchChange}
                variant="outlined"
                margin="normal"
            />
            <Grid container spacing={2} direction="column">
                {recipesToShow.map(recipe => (
                    <Grid item xs={12} key={recipe.ID}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{recipe.title}</Typography>
                                <Box mt={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleRecipeClick(recipe)}
                                        sx={{ mr: 2 }}
                                    >
                                        View Recipe
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        p: 4,
                        boxShadow: 24,
                        maxWidth: 600,
                        width: '100%',
                        borderRadius: 2,
                        overflow: 'auto',
                        maxHeight: '80vh'
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" sx={{ color: 'black' }}>{selectedRecipe?.title}</Typography>
                        <IconButton onClick={handleModalClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box mt={2}>
                        <Typography variant="h6" sx={{ color: 'black' }}>Ingredients:</Typography>
                        <ul style={{ color: 'black' }}>
                            {selectedRecipe?.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                        <Typography variant="h6" sx={{ color: 'black' }}>Instructions:</Typography>
                        <Typography sx={{ color: 'black' }}>{selectedRecipe?.instructions}</Typography>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default RecipesPage;
