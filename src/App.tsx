import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContextProvider } from "./context/UserContextProvider";
import { ExerciseProvider } from './context/ExerciseContext'; // Make sure this import is correct

// Import pages
import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import Register from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/OTP';
import LandingPage2 from './pages/ProfileLandingPage';
import ExerciseList from "./pages/ExerciseList";

function App() {
    const router = createBrowserRouter([
        { path: "/", element: <LandingPage/> },
        { path: "/sign-in", element: <SignIn/> },
        { path: "/register", element: <Register/> },
        { path: "/forgot-password", element: <ForgotPassword/> },
        { path: "/reset-password", element: <ResetPassword/> },
        { path: "/otp", element: <EmailVerification/> },
        { path: "/profile", element: <LandingPage2/> },
        { path: "/exercise", element: <ExerciseList/> },
    ]);

    return (
        <UserContextProvider>
            <ThemeProvider theme={createTheme()}>
                <ExerciseProvider> {/* Wrap RouterProvider with ExerciseProvider */}
                    <RouterProvider router={router}/>
                </ExerciseProvider>
            </ThemeProvider>
        </UserContextProvider>
    );
}

export default App;
