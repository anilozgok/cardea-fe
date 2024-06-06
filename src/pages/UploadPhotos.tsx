import React, { useCallback, useState, useEffect } from 'react';
import {
    Typography, Grid, IconButton, Button, Box, Dialog,
    DialogTitle, DialogContent, DialogActions, Snackbar, Alert,
    AppBar,
    Avatar,
    Container,
    MenuItem,
    Toolbar
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ImageIcon from '@mui/icons-material/Image';
import { useDropzone } from 'react-dropzone';
import logo from '../assets/CardeaLogo.png';
import { useNavigate } from 'react-router-dom';
import GetAppIcon from '@mui/icons-material/GetApp';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from "axios";


function PhotoUpload(): JSX.Element {
    const [files, setFiles] = useState<File[]>([]);
    const [photos, setPhotos] = useState([]);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [openImageViewDialog, setOpenImageViewDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [imageDimensions, setImageDimensions] = useState({ width: 'auto', height: 'auto' });
    const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple: true });

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/user/my-photos', {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPhotos(data.photos);
            } catch (error) {
                console.error('Failed to fetch photos:', error);
            }
        };

        fetchPhotos();
    }, [openUploadDialog]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/'); // Redirect to the landing page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleClosePhoto = () => {
        setOpenImageViewDialog(false);
    };

    const handleSave = async () => {
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch('http://localhost:8080/api/v1/profile/upload-photo', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    console.log('File uploaded successfully', file.name);
                    setToast({ open: true, message: 'Files uploaded successfully!', severity: 'success' });
                    setFiles([]);
                    setOpenUploadDialog(false);
                }
            } catch (e) {
                console.error('Upload failed', e);
                setToast({ open: true, message: `Upload failed: ${e.message}`, severity: 'error' });
            }
        }
    };

    const handleDownload = (base64Data, filename) => {
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${base64Data}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpenPhoto = async (photoUrl) => {
        const response = await fetch(photoUrl);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            setSelectedImage(base64data); 
            setOpenImageViewDialog(true);
        }
    };
    const handleClickOpen = () => {
        setOpenUploadDialog(true);
    };

    const handleClose = () => {
        setOpenUploadDialog(false);
    };

    const handleToastClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast({ open: false, message: '', severity: 'info' });
    };

    return (
        <>
            <AppBar position="fixed" sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}>
                <Container maxWidth="lg">
                    <Toolbar variant="regular" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '999px', bgcolor: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(24px)', maxHeight: 56, border: '1px solid', borderColor: 'divider', padding: '0 24px' }}>
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="logo of Cardea" style={{ width: 80, height: 80, borderRadius: '50%' }} />
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', ml: 4 }}>
                                <MenuItem onClick={() => navigate('/landing')}>
                                    <Typography variant="body1" color="text.primary">Home</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/workouts')}>
                                    <Typography variant="body1" color="text.primary">Workouts</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/diets')}>
                                    <Typography variant="body1" color="text.primary">Diet Plans</Typography>
                                </MenuItem>
                                <Button startIcon={<CloudUploadIcon />} onClick={handleClickOpen}>Upload Photos</Button>
                            </Box>
                            <Avatar sx={{ width: 40, height: 40 }} onClick={() => navigate('/profile')} />
                            <Button
                                onClick={handleLogout}
                                startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft:'20px'}} />} 
                            >
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ mt: 10, p: 2 }}>
                <Grid container spacing={3}>
                    {photos.map((photoUrl, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} style={{
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
                            <img src={photoUrl} alt={`Photo ${index}`} style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease'
                            }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                                onClick={() => handleOpenPhoto(photoUrl)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Dialog open={openUploadDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload Your Form Pictures Here</DialogTitle>
                <DialogContent>
                    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '100px', textAlign: 'center', cursor: 'pointer', minHeight: '200px', minWidth: '250px' }}>
                        <input {...getInputProps()} />
                        {files.length === 0 && (
                            <Box textAlign="center">
                                <ImageIcon style={{ fontSize: 60, color: '#ccc' }} />
                                <Typography>{isDragActive ? 'Drop the images here...' : 'Drag \'n\' drop images here, or click to select images'}</Typography>
                            </Box>
                        )}
                        <Grid container spacing={2} justifyContent="center">
                            {files.map((file, index) => (
                                <Grid item key={index} style={{ width: 100, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                    <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} style={{ width: '100%', height: 'auto' }} />
                                    <IconButton size="small" style={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }} onClick={(event) => {
                                        event.stopPropagation();
                                        setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
                                    }}>
                                        <DeleteOutlineIcon style={{ color: 'red', opacity: 0.8 }} />
                                    </IconButton>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save Photos</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openImageViewDialog} onClose={handleClosePhoto} maxWidth="lg">
                <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: imageDimensions.width, height: imageDimensions.height }}>
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePhoto} color="primary">Close</Button>
                    <Button
                        component="a"
                        href={selectedImage}
                        download={`downloadedImage.jpg`} 
                        color="primary"
                        startIcon={<GetAppIcon />}
                    >
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
                <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default PhotoUpload;