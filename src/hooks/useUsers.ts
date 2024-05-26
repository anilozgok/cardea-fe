import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    userId: string;
    firstName: string;
    lastName: string;
}

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/v1/user/all', { withCredentials: true });
                setUsers(response.data.users || []); // Ensure response data is an array
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};

export default useUsers;
