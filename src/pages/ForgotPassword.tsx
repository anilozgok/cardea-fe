import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import {useUser} from "../context/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import logo from '../assets/CardeaLogo.png';

type forgotPwRequest = {
    email: string
}

export default function ForgotPassword() {
    const user = useUser()
    const navigate = useNavigate()

    async function request(forgotPwRequest: forgotPwRequest) {
        const res = await axios.post("http://localhost:8080/api/v1/auth/login", forgotPwRequest, {withCredentials: true})

        if (res.status === 200) {
            await user.refetchAfterLogin()
            navigate('/')
        }

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const forgotPwRequest: forgotPwRequest = {
            email: data.get('email') as string,
        }
        navigateTo()
    };
    const navigateTo = ()=> {
        navigate('/reset-password')
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
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
                    Reset Password
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                    Please enter the e-mail address that you used to register, and we will send you a link to reset your password via e-mail.
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Proceed 
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}