import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { useUser } from "../context/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import logo from '../assets/CardeaLogo.png';

type loginRequest = {
    email: string,
    password: string
}

export default function SignIn() {
    const user = useUser()
    const navigate = useNavigate()

    async function request(loginRequest: loginRequest) {
        const res = await axios.post("http://localhost:8080/api/v1/auth/login", loginRequest, { withCredentials: true })

        if (res.status === 200) {
            await user.refetchAfterLogin()
            const hasProfile: boolean = res.headers['has-profile'] === 'true';
            if (!hasProfile) {
                navigate('/profile');
            } else {
                navigate('/');
            }
        }
    }
    const handleForgotPw = () => {
        navigate('/forgot-password');
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginRequest: loginRequest = {
            email: data.get('email') as string,
            password: data.get('password') as string
        }
        request(loginRequest)
    };
    const handleSignUpClick = () => {
        navigate('/register');
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
                <div>
                    <img src={logo} alt="Logo" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                </div>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" onClick={handleForgotPw}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={handleSignUpClick}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}