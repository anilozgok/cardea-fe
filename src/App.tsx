import './App.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import SignIn from "./pages/SignIn.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import {UserContextProvider} from "./context/UserContextProvider.tsx";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Register from './pages/RegisterPage.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import EmailVerification from './pages/OTP.tsx';
import LandingPage2 from './pages/ProfileLandingPage.tsx';


function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage/>,

        },
        {
            path: "/sign-in",
            element: <SignIn/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
        {
            path: "/forgot-password",
            element: <ForgotPassword/>,
        },
        {
            path: "/reset-password",
            element: <ResetPassword/>,
        },
        {
            path: "/Otp",
            element: <EmailVerification/>,
        },
        {
            path: "/profile",
            element: <LandingPage2/>,
        },
        
    ]);

    return (
        <UserContextProvider>
            <ThemeProvider theme={createTheme()}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </UserContextProvider>

    )
}

export default App
