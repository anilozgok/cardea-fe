// src/hooks/useFoods.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Food {
    id: number;
    name: string;
    protein: number;
    fat: number;
    carbohydrate: number;
    calorie: number;
    fiber: number;
}

const useFoods = () => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFoods = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/v1/foods', { withCredentials: true });
                setFoods(response.data);
            } catch (err) {
                setError('Failed to fetch foods');
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    return { foods, loading, error };
};

export default useFoods;
