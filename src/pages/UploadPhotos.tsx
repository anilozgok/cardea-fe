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
import DeleteIcon from '@mui/icons-material/Delete';
import bgPicture from '../assets/uploadBg2.png';

type PhotoResponse = {
    photoId: number;
    photoURL: string;
    createdAt: string; // Ensure this exists with full timestamp
};

function PhotoUpload(): JSX.Element {
    const [files, setFiles] = useState<File[]>([]);
    const [photos, setPhotos] = useState<{ [key: string]: PhotoResponse[] }>({});
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [openImageViewDialog, setOpenImageViewDialog] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [imageDimensions, setImageDimensions] = useState({ width: 'auto', height: 'auto' });
    const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
    const navigate = useNavigate();
    const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');
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
    
        document.body.style.backgroundImage = `url(${bgPicture})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundRepeat = 'no-repeat';
    
        return () => {
          document.body.style.backgroundImage = '';
          document.body.style.backgroundSize = '';
          document.body.style.backgroundPosition = '';
          document.body.style.backgroundAttachment = '';
          document.body.style.backgroundRepeat = '';
        };
      }, []);
    


    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple: true });

    useEffect(() => {
        fetchPhotos();
    }, [openUploadDialog]);

    const fetchPhotos = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/my-photos', {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: { photos: PhotoResponse[] } = await response.json();
            const groupedPhotos = groupPhotosByDate(data.photos);
            setPhotos(groupedPhotos);
        } catch (error) {
            console.error('Failed to fetch photos:', error);
        }
    };

    const groupPhotosByDate = (photos: PhotoResponse[]) => {
        return photos.reduce((acc, photo) => {
            const date = photo.createdAt.split('T')[0]; // Split by 'T' and take the date part
            acc[date] = acc[date] || [];
            acc[date].push(photo);
            return acc;
        }, {} as { [key: string]: PhotoResponse[] });
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout', {}, { withCredentials: true });
            navigate('/');
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
                }
                console.log('File uploaded successfully', file.name);
            } catch (e) {
                console.error('Upload failed', e);
                setToast({ open: true, message: `Upload failed: ${e.message}`, severity: 'error' });
            }
        }

        fetchPhotos();  // Fetch the updated list of photos after all uploads are done
        setFiles([]);  // Clear the files array
        setOpenUploadDialog(false);  // Close the upload dialog
    };

    const handleDownload = (base64Data, filename) => {
        const link = document.createElement('a');
        link.href = `data:image/jpeg;base64,${base64Data}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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

    const handleDeletePhoto = async () => {
        if (!selectedPhotoId || !selectedPhotoUrl) return; // Ensure both ID and URL are available

        try {
            // Sending both ID and URL in the request body
            const response = await axios.delete('http://localhost:8080/api/v1/user/photo', {
                data: {
                    photoId: selectedPhotoId,
                    photoUrl: selectedPhotoUrl
                },
                withCredentials: true
            });

            if (response.status === 200) {
                setPhotos((prevPhotos) => {
                    const updatedPhotos = { ...prevPhotos };
                    for (const date in updatedPhotos) {
                        updatedPhotos[date] = updatedPhotos[date].filter(photo => photo.photoId !== selectedPhotoId);
                    }
                    return updatedPhotos;
                }); // Update the photos state
                setOpenImageViewDialog(false); // Close the dialog
                setToast({ open: true, message: 'Photo deleted successfully!', severity: 'success' });
            } else {
                throw new Error('Failed to delete photo');
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
            setToast({ open: true, message: `Failed to delete photo: ${error.message}`, severity: 'error' });
        }
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
                                <MenuItem onClick={() => navigate('/diet-plan-user')}>
                                    <Typography variant="body1" color="text.primary">Diet Plans</Typography>
                                </MenuItem>
                                <Button startIcon={<CloudUploadIcon />} onClick={handleClickOpen}>Upload Photos</Button>
                            </Box>
                            <Avatar src={profilePicture} sx={{ width: 40, height: 40 }} onClick={() => navigate('/profile')} />
                            <Button
                                onClick={handleLogout}
                                startIcon={<ExitToAppIcon style={{ fontSize: '48px', marginLeft: '20px' }} />}
                            >
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ mt: 10, p: 2 }}>
                {Object.entries(photos).map(([date, photosOnDate]) => (
                    <div key={date} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0', position: 'relative' }}>
                            <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#ddd', marginRight: '40px' }}></div>
                            <span style={{ whiteSpace: 'nowrap', color:'black'}}>{date}</span>
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
                    <Button component="a" href={selectedImage} download={`downloadedImage.jpg`} color="primary" startIcon={<GetAppIcon />}>
                        Download
                    </Button>
                    <Button onClick={handleDeletePhoto} color="primary" startIcon={<DeleteIcon />}>
                        Delete
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
