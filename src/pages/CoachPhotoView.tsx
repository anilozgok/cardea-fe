import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { useUser } from "../context/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import logo from '../assets/CardeaLogo.png';
import { FormControl, InputLabel, Select, MenuItem, AppBar, Avatar, Toolbar, Grid, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useState, useEffect } from 'react';
import useUsers from '../hooks/useUsersOfCoach.ts';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import bgPicture from '../assets/uploadBg.png';

type PhotoResponse = {
    photoId: number;
    photoURL: string;
    createdAt: string; // Ensure this exists with full timestamp
};

export default function SignIn() {
    const [imageDimensions, setImageDimensions] = useState({ width: 'auto', height: 'auto' });
    const user = useUser();
    const navigate = useNavigate();
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [openImageViewDialog, setOpenImageViewDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const { users, loading: usersLoading, error: usersError } = useUsers();
    const [photos, setPhotos] = useState<{ [key: string]: PhotoResponse[] }>({});
    const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    useEffect(() => {
        // When the component mounts
        document.body.style.backgroundImage = `url(${bgPicture})`;
        document.body.style.backgroundSize = 'cover'; // Cover the viewport
        document.body.style.backgroundPosition = 'center'; // Center the background image
        document.body.style.backgroundAttachment = 'fixed'; // Make background fixed during scrolling
        document.body.style.backgroundRepeat = 'no-repeat'; // Do not repeat the image
    
        // When the component unmounts
        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.backgroundAttachment = '';
            document.body.style.backgroundRepeat = '';
        };
    }, []);
    

    const handleOpenPhoto = async (photoId, photoUrl) => {
        try {
            setSelectedPhotoId(photoId); // Store the photo ID
            setSelectedPhotoUrl(photoUrl); // Also store the photo URL for delete operation
            const response = await fetch(photoUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                setSelectedImage(base64data);
                setOpenImageViewDialog(true);
            }
        } catch (error) {
            console.error('Failed to load photo:', error);
            setToast({ open: true, message: 'Failed to load photo', severity: 'error' });
        }
    };

    const handleGetPhotos = async () => {
        if (!selectedUserId) {
            console.error('Please select a user first.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/user/student-photos/${selectedUserId}`, { withCredentials: true });
            const data: { photos: PhotoResponse[] } = response.data;
            const groupedPhotos = groupPhotosByDate(data.photos);
            setPhotos(groupedPhotos);
        } catch (error) {
            console.error('Error retrieving photos:', error);
        }
    };
    const handleClosePhoto = () => {
        setOpenImageViewDialog(false);
    };

    const groupPhotosByDate = (photos: PhotoResponse[]) => {
        return photos.reduce((acc, photo) => {
            const date = photo.createdAt.split('T')[0];
            acc[date] = acc[date] || [];
            acc[date].push(photo);
            return acc;
        }, {} as { [key: string]: PhotoResponse[] });
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
                            <MenuItem onClick={() => navigate('/diet-plan')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Diet Plans
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/exercise')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Workouts
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate('/diet-plan-update')} sx={{ py: '10px', px: '36px' }}>
                                <Typography variant="body1" color="text.primary">
                                    Update Diet Plan
                                </Typography>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={user.name} sx={{ width: 40, height: 40, mr: 2 }} onClick={() => navigate('/profile')} />
                        </Box>

                        <Button
                            onClick={handleLogout}
                            startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft: '20px' }} />}
                        >
                        </Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ mt: 10 }}>
                <FormControl fullWidth sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <InputLabel id="user-select-label">Select User</InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Select
                            labelId="user-select-label"
                            value={selectedUserId}
                            label="Select User"
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            sx={{ flexGrow: 1, mr: 2, minWidth: '190px' }}
                        >
                            {users.map(user => (
                                <MenuItem key={user.userId} value={user.userId}>
                                    {user.firstName} {user.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button variant="contained" color="primary" sx={{ height: '56px' }} onClick={handleGetPhotos}>
                            Retrieve Photos
                        </Button>
                    </Box>
                </FormControl>
                <Box>
                    {Object.entries(photos).map(([date, photosOnDate]) => (
                        <div key={date} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0', position: 'relative' }}>
                                <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#ddd', marginRight: '40px' }}></div>
                                <span style={{ whiteSpace: 'nowrap', color: 'black' }}>{date}</span>
                                <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#ddd', marginLeft: '40px' }}></div>
                            </div>
                            <Grid container spacing={3}>
                                {photosOnDate.map((photo) => (
                                    <Grid item xs={12} sm={6} md={4} key={photo.photoId} style={{
                                        padding: '8px',
                                        height: '250px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '1px solid #ddd',
                                        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                    }}>
                                        <img src={photo.photoURL} alt={`Photo ${photo.photoId}`} style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease'
                                        }}
                                            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                            onClick={() => handleOpenPhoto(photo.photoId, photo.photoURL)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    ))}
                </Box>
            </Box>
            <Dialog open={openImageViewDialog} onClose={handleClosePhoto} maxWidth="lg">
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: imageDimensions.width, height: imageDimensions.height }}>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePhoto} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
