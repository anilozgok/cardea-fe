// src/App.tsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContextProvider } from "./context/UserContextProvider";
import { ExerciseProvider } from './context/ExerciseContext';

// Import pages
import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import Register from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/OTP';
import ProfileLandingPage from './pages/ProfileLandingPage';
import ExerciseList from "./pages/ExerciseList";
import WorkoutsList from './pages/WorkoutList';
import CreateDietPlan from './pages/CreateDietPlanPage.tsx';
import UserDietPlanPage from './pages/UserDietPlanPage';

const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: "/otp", element: <EmailVerification /> },
    { path: "/profile", element: <ProfileLandingPage /> },
    { path: "/exercise", element: <ExerciseList /> },
    { path: "/workouts", element: <WorkoutsList /> },
    { path: "/create-diet-plan", element: <CreateDietPlan /> },
    { path: "/user-diet-plan", element: <UserDietPlanPage /> }
]);

function App() {
    return (
        <UserContextProvider>
            <ThemeProvider theme={createTheme()}>
                <ExerciseProvider>
                    <RouterProvider router={router} />
                </ExerciseProvider>
            </ThemeProvider>
        </UserContextProvider>
    );
}

export default App;
