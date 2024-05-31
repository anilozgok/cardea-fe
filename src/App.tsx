import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContextProvider } from "./context/UserContextProvider";
import { ExerciseProvider } from './context/ExerciseContext';

import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import Register from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/OTP';
import ExerciseList from "./pages/ExerciseList";
import WorkoutsList from './pages/WorkoutList';
import UserProfiles from './pages/UserProfile';
import UpdatePassword from './pages/UpdatePassword';
import PhotoUpload from './pages/UploadPhotos';
import BMICalculator from "./pages/BMICalculatorPage.tsx";
import WaterIntakeCalculator from "./pages/WaterIntakeCalculatorPage.tsx";
import CaffeineIntakeCalculator from "./pages/CaffeineCalculatorPage.tsx";
import CalorieIntakeCalculator from "./pages/DailyCalorieCalculatorPage.tsx";
import BodyFatCalculator from "./pages/BodyFatCalculatorPage.tsx";
import IdealWeightCalculator from "./pages/IdealWeightCalculatorPage.tsx";


function App() {
    const router = createBrowserRouter([
        { path: "/", element: <LandingPage/> },
        { path: "/sign-in", element: <SignIn/> },
        { path: "/register", element: <Register/> },
        { path: "/forgot-password", element: <ForgotPassword/> },
        { path: "/reset-password", element: <ResetPassword/> },
        { path: "/otp", element: <EmailVerification/> },
        { path: "/exercise", element: <ExerciseList/> },
        { path: "/workouts", element: <WorkoutsList/> },
        { path: "/profile", element: <UserProfiles/> },
        { path: "/update-password", element: <UpdatePassword/> },
        { path: "/upload-photos", element: <PhotoUpload/> },
        { path: "/bmi-calculator", element: <BMICalculator/> },
        { path: "/water-intake-calculator", element: <WaterIntakeCalculator/> },
        { path: "/caffeine-intake-calculator", element: <CaffeineIntakeCalculator/> },
        { path: "/calorie-intake-calculator", element: <CalorieIntakeCalculator/> },
        { path: "/body-fat-percentage-calculator", element: <BodyFatCalculator/> },
        { path: "/ideal-weight-calculator", element: <IdealWeightCalculator/> },


    ]);

    return (
        <UserContextProvider>
            <ThemeProvider theme={createTheme()}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </UserContextProvider>

    )

}
export default App;
