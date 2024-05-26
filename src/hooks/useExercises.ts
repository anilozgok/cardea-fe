// src/hooks/useExercises.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Exercise {
    id: string;
    name: string;
    bodyPart: string;
    target: string;
    equipment: string;
    gif: string;
    reps?: number;  // Optional since reps are set in the UI
    sets?: number;  // Optional since sets are set in the UI
}

const useExercises = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/exercises'); // Adjust the URL as needed
                setExercises(response.data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    return { exercises, loading, error };
};

export default useExercises;
