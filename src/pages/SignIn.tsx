import * as React from 'react';
import { useState, useRef } from 'react';
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
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useUser } from "../context/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import logo from '../assets/CardeaLogo.png';
import { ToastContainer, toast } from 'react-toastify';

type loginRequest = {
    email: string,
    password: string
}

export default function SignIn() {
    const user = useUser();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const handleClickShowPassword = () => {
        if (passwordInputRef.current) {
            const cursorPosition = passwordInputRef.current.selectionStart;
            setShowPassword(!showPassword);
            setTimeout(() => {
                if (passwordInputRef.current) {
                    passwordInputRef.current.focus();
                    passwordInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
                }
            }, 0);
        }
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            setIsTyping(true);
        } else {
            setIsTyping(false);
        }
    };

    async function request(loginRequest: loginRequest) {
        try {
            const res = await axios.post("http://34.116.133.84:8080/api/v1/auth/login", loginRequest, { withCredentials: true });

            if (res.status === 200) {
                await user.refetchAfterLogin();
                const hasProfile: boolean = res.headers['has-profile'] === 'true';
                if (!hasProfile) {
                    navigate('/profile');
                } else {
                    navigate('/');
                }
            } else if (res.status >= 400 && res.status < 600) {
                toastInfo('error', capitalizeFirstLetter(res.data));
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toastInfo('error', capitalizeFirstLetter(error.response.data));
            } else {
                toastInfo('error', 'An unexpected error occurred');
            }
        }
    }

    const toastInfo = (toastMethod: string, messageToShow: string) => {
        const method = toastMethod === 'error' ? toast.error : toast.success;

        method(messageToShow, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    function capitalizeFirstLetter(string: string): string {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleForgotPw = () => {
        navigate('/forgot-password');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginRequest: loginRequest = {
            email: data.get('email') as string,
            password: data.get('password') as string
        };
        if (!loginRequest.email) {
            toastInfo('error', 'Email Address is a required field');
            return;
        }
        if (!loginRequest.password) {
            toastInfo('error', 'Password is a required field');
            return;
        }
        request(loginRequest);
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
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                        inputRef={passwordInputRef}
                        InputProps={{
                            endAdornment: isTyping ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                        }}
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
