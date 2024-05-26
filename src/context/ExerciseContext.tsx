// src/context/ExerciseContext.tsx

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Exercise } from "../types/Exercise";

interface ExerciseContextType {
    exercises: Exercise[];
    loadExercises: () => Promise<void>;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const ExerciseProvider = ({ children }: { children: ReactNode }) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);

    async function loadExercises() {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/workout/exercises", {
                withCredentials: true
            });
            setExercises(response.data.exercises); // Ensure the correct path based on API response
        } catch (error) {
            console.error("Failed to fetch exercises:", error);
        }
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <ExerciseContext.Provider value={{ exercises, loadExercises }}>
            {children}
        </ExerciseContext.Provider>
    );
};

export const useExercises = () => {
    const context = useContext(ExerciseContext);
    if (!context) {
        throw new Error("useExercises must be used within an ExerciseProvider");
    }
    return context;
};
