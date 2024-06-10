// src/pages/UserChatPage.tsx
import React, { useState, useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const UserChatPage: React.FC = () => {
    const { user } = useUser();
    const [messageContent, setMessageContent] = useState('');
    const { messages, sendMessage } = useWebSocket('ws://localhost:8080/ws');
    const [coach, setCoach] = useState(null);

    useEffect(() => {
        const fetchCoach = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/user/me', { withCredentials: true });
                const userId = response.data.userId;
                const workoutsResponse = await axios.get(`http://localhost:8080/api/v1/user/workouts`, { withCredentials: true });
                const coachId = workoutsResponse.data.workouts[0]?.coachId;
                setCoach(coachId);
            } catch (error) {
                console.error('Failed to fetch coach:', error);
            }
        };

        fetchCoach();
    }, [user]);

    const handleSendMessage = () => {
        const message = {
            SenderID: user.userId,
            ReceiverID: coach,
            Content: messageContent,
        };
        sendMessage(message);
        setMessageContent('');
    };

    return (
        <div>
            <h2>Chat with Your Coach</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.SenderID === user.userId ? 'You' : 'Coach'}:</strong> {msg.Content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default UserChatPage;
