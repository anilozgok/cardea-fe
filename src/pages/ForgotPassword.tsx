import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../assets/CardeaLogo.png';
import { ToastContainer, toast } from 'react-toastify';



export default function ForgotPassword() {
    const navigate = useNavigate()

    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;

        if (email) {
            try {
                const response = await axios.get(`http://34.116.133.84:8080/api/v1/auth/check-user?email=${email}`, { withCredentials: true });
                if (response.status === 200) {
                    navigate('/otp', { state: { email } });
                } else if (response.status >= 400 && response.status < 600) {
                    toastInfo('error', capitalizeFirstLetter(response.data));
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    toastInfo('error', capitalizeFirstLetter(error.response.data));
                } else {
                    toastInfo('error', 'An unexpected error occurred');
                }
            }
        } else {
            toastInfo('error', 'Please provide an email address.');
        }
    };

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