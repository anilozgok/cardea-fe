import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../assets/CardeaLogo.png';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

type registerRequest = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: 'male' | 'female',
    dateOfBirth: Date,
    role: 'coach' | 'user'
}

export default function Register() {
    const navigate = useNavigate()
    const notify = () => toast.success('Succesfully Registered', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    const [date, setDate] = useState('');
    const [error, setError] = useState(false);

    const handleDateChange = (event: { target: { value: any; }; }) => {
        const selectedDate = event.target.value;
        if (new Date(selectedDate) >= new Date()) {
            setError(true);
            setDate('');
        } else {
            setError(false);
            setDate(selectedDate);
        }
    };

    async function request(registerRequest: registerRequest) {
        const res = await axios.post(
            "http://localhost:8080/api/v1/auth/register", registerRequest, { withCredentials: true }
        );

        if (res.status === 200) {
            notify();
            setTimeout(() => {
                navigate('/sign-in');
            }, 2000);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const registerRequest: registerRequest = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            gender: formData.get('gender') as 'male' | 'female',
            dateOfBirth: new Date(formData.get('dateOfBirth') as string),
            role: formData.get('role') as 'coach' | 'user',
        }
        request(registerRequest)
    };

    const handleSignInClick = () => {
        navigate('/sign-in');

    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div>
                    <img src={logo} alt="Logo" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <Typography component="h1" variant="h5">
                    Sign up to Cardea
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="gender"
                                label="Gender"
                                name="gender"
                                select
                                SelectProps={{ native: true }}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="dateOfBirth"
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    max: today,
                                }}
                                value={date}
                                onChange={handleDateChange}
                                error={error}
                                helperText={error ? "Please enter a valid date." : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="role"
                                label="Role"
                                name="role"
                                select
                                SelectProps={{ native: true }}
                            >
                                <option value="coach">Coach</option>
                                <option value="user">Student</option>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={handleSignInClick} variant="body2" style={{ cursor: 'pointer' }}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};