import { useEffect, useState } from 'react';
import axios from 'axios';
import { Workout } from '../types/Workout';

const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://34.116.133.84:8080/api/v1/user/workouts', { withCredentials: true });
        if (response.data && Array.isArray(response.data.workouts)) {
          setWorkouts(response.data.workouts);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch workouts');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return { workouts, loading, error };
};

export default useWorkouts;
