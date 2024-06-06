import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface Meal {
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

interface DietPlan {
    id: number;
    name: string;
    meals: Meal[];
}

interface DietContextType {
    dietPlans: DietPlan[];
    loading: boolean;
    error: string | null;
    fetchDietPlans: (userId: number) => Promise<void>;
}

const DietContext = createContext<DietContextType | undefined>(undefined);

export const DietProvider: React.FC = ({ children }) => {
    const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDietPlans = useCallback(async (userId: number) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/diet?user_id=${userId}`, { withCredentials: true });
            setDietPlans(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch diet plans');
            setLoading(false);
        }
    }, []);

    return (
        <DietContext.Provider value={{ dietPlans, loading, error, fetchDietPlans }}>
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
