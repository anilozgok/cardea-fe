import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import logo from '../assets/CardeaLogo.png';
import { ToastContainer, toast } from 'react-toastify';

interface PasswordValidation {
    isLengthValid: boolean;
    hasNumber: boolean;
    hasUpperCase: boolean;
    hasSpecialChar: boolean;
}


const validatePassword = (password: string): PasswordValidation => {
    return {
        isLengthValid: password.length >= 8,
        hasNumber: /\d/.test(password),
        hasUpperCase: /[A-Z]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
};

export default function UpdatePassword() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
        isLengthValid: false,
        hasNumber: false,
        hasUpperCase: false,
        hasSpecialChar: false
    });
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordValidation(validatePassword(newPassword));
        setPasswordsMatch(newPassword === confirmPassword);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordsMatch(password === newConfirmPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!passwordValidation.isLengthValid || !passwordValidation.hasNumber ||
            !passwordValidation.hasUpperCase || !passwordValidation.hasSpecialChar ||
            password !== confirmPassword) {
            alert("Please ensure all password requirements are met and passwords match.");
            return;
        }
    
        try {
            const res = await axios.put("http://localhost:8080/api/v1/auth/update-password", {
                email: state.email,
                password: password
            }, { withCredentials: true });
    
            if (res.status === 200) {
                notify();
            setTimeout(() => {
                navigate('/sign-in'); 
            }, 2000);
            }
        } catch (error) {
            console.error('Failed to reset password', error);
        }
    };

    const notify = () => toast.success('Succesfully changed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: 100, height: 100, borderRadius: '50%' }} />
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
                <Typography component="h1" variant="h5">Enter your new password</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter your old password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="old-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Enter your new password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm your new password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        autoComplete="new-password"
                    />
                    <Box sx={{ mt: 1 }}>
                        {password && (
                            <>
                                <div style={{ color: passwordValidation.isLengthValid ? 'green' : 'red', fontSize: '0.75rem' }}>
                                    Password must be at least 8 characters: {passwordValidation.isLengthValid ? '✓' : '✗'}
                                </div>
                                <div style={{ color: passwordValidation.hasNumber ? 'green' : 'red', fontSize: '0.75rem' }}>
                                    Password must contain at least one number: {passwordValidation.hasNumber ? '✓' : '✗'}
                                </div>
                                <div style={{ color: passwordValidation.hasUpperCase ? 'green' : 'red', fontSize: '0.75rem' }}>
                                    Password must contain at least one uppercase letter: {passwordValidation.hasUpperCase ? '✓' : '✗'}
                                </div>
                                <div style={{ color: passwordValidation.hasSpecialChar ? 'green' : 'red', fontSize: '0.75rem' }}>
                                    Password must contain at least one special character: {passwordValidation.hasSpecialChar ? '✓' : '✗'}
                                </div>
                            </>
                        )}
                        {confirmPassword && (
                            <div style={{ color: passwordsMatch ? 'green' : 'red', fontSize: '0.75rem' }}>
                                Passwords match: {passwordsMatch ? '✓' : '✗'}
                            </div>
                        )}
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
