import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';

interface Meal {
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    gram: number; // Include gram in the interface
}

interface DietPlan {
    id?: number; // Optional since it might not exist for new plans
    name: string;
    meals: Meal[];
}

interface DietContextType {
    dietPlans: DietPlan[];
    loading: boolean;
    error: string | null;
    fetchDietPlans: (userId: number) => Promise<void>;
    addDietPlan: (dietPlan: DietPlan) => Promise<void>;
}

interface DietProviderProps {
    children: ReactNode;
}

const DietContext = createContext<DietContextType | undefined>(undefined);

export const DietProvider: React.FC<DietProviderProps> = ({ children }) => {
    const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDietPlans = useCallback(async (userId: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://34.116.133.84:8080/api/v1/diet?user_id=${userId}`, { withCredentials: true });
            setDietPlans(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch diet plans');
            setLoading(false);
        }
    }, []);

    const addDietPlan = useCallback(async (dietPlan: DietPlan) => {
        setLoading(true);
        try {
            await axios.post(`http://34.116.133.84:8080/api/v1/diet`, dietPlan, { withCredentials: true });
            setDietPlans(prev => [...prev, dietPlan]); // Optionally add to local state
            setLoading(false);
        } catch (err) {
            setError('Failed to add diet plan');
            setLoading(false);
        }
    }, []);

    return (
        <DietContext.Provider value={{ dietPlans, loading, error, fetchDietPlans, addDietPlan }}>
            {children}
        </DietContext.Provider>
    );
};

export const useDiet = (): DietContextType => {
    const context = useContext(DietContext);
    if (context === undefined) {
        throw new Error('useDiet must be used within a DietProvider');
    }
    return context;
};
