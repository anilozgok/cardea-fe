import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import {useUser} from "../context/UserContext.tsx";
import {useNavigate} from "react-router-dom";

type registerRequest = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    height: number,
    weight: number,
    gender: 'male' | 'female',
    dateOfBirth: Date,
    role : string
}

export default function Register() {
    const user = useUser()
    const navigate = useNavigate()

    async function request(registerRequest: registerRequest) {
        const res = await axios.post(
            "http://localhost:8080/api/v1/auth/register", registerRequest,{ withCredentials: true}
          );
          

        if (res.status === 200) {
            await user.refetchAfterLogin()
            navigate('http://localhost:8080/api/v1/auth/login')
        }

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const registerRequest: registerRequest = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            height: parseInt(formData.get('height') as string),
            weight: parseInt(formData.get('weight') as string),
            gender: formData.get('gender') as 'male' | 'female',
            dateOfBirth: new Date(formData.get('dateOfBirth') as string),
            role: formData.get('role') as string,
        };
        try {
            await request(registerRequest);
        } catch (error) {
            console.error("Error occurred while submitting the form:", error);
        }
    };
    

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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
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
                                id="height"
                                label="Height"
                                name="height"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="weight"
                                label="Weight"
                                name="weight"
                                type="number"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                                required
                                fullWidth
                                id="role"
                                label="Role"
                                name="role"
                            />
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
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};