import React, { useCallback, useState } from 'react';
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
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import logo from '../assets/CardeaLogo.png';
import { Navigate, useNavigate } from 'react-router-dom';

function PhotoUpload(): JSX.Element {
    const [files, setFiles] = useState<File[]>([]);
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
    const navigate = useNavigate()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', multiple: true } as unknown as DropzoneOptions);

    const removeFile = (fileToRemove: File, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToastClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast({ open: false, message: '', severity: 'info' });
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
                }
            } catch (e) {
                console.error('Upload failed', e);
                setToast({ open: true, message: `Upload failed: ${e.message}`, severity: 'error' });
                return;
            }
        }
        setToast({ open: true, message: 'Files uploaded successfully!', severity: 'success' });
        handleClose();
    };

    return (
        <>
            <div>
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
                borderRadius: '999px',
                bgcolor:
                    theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.4)'
                        : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(24px)',
                maxHeight: 56,
                border: '1px solid',
                borderColor: 'divider',
                padding: '0 24px', // Even padding
                boxShadow:
                    theme.palette.mode === 'light'
                        ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                        : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={logo}
                    alt="logo of Cardea"
                    style={{ width: 80, height: 80, borderRadius: '50%' }}
                />
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', ml: 4 }}>
                    <MenuItem onClick={() => navigate('/')}>
                        <Typography variant="body1" color="text.primary">
                            Home
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/workouts')}>
                        <Typography variant="body1" color="text.primary">
                            My Workouts
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/diets')}>
                        <Typography variant="body1" color="text.primary">
                            My Diet Plans
                        </Typography>
                    </MenuItem>
                    <Button startIcon={<CloudUploadIcon />} onClick={handleClickOpen}>
                        Upload Photos
                    </Button>
                </Box>
                <Avatar sx={{ width: 40, height: 40 }} onClick={() => navigate('/profile')} />
            </Box>
        </Toolbar>
    </Container>
</AppBar>

            </div>
            <div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Upload Your Body Photos Here</DialogTitle>
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
                                        <IconButton
                                            size="small"
                                            style={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(255, 255, 255, 0.5)', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}
                                            onClick={(event) => removeFile(file, event)}
                                        >
                                            <DeleteOutlineIcon style={{ color: 'red', opacity: 0.8 }} />
                                        </IconButton>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save Photos
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
                    <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: '100%' }}>
                        {toast.message}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
}

export default PhotoUpload;
