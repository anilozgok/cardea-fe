// src/pages/CoachChatPage.tsx
import React, { useState, useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import { useUser } from '../context/UserContext';
import axios from 'axios';

const CoachChatPage: React.FC = () => {
    const { user } = useUser();
    const [messageContent, setMessageContent] = useState('');
    const { messages, sendMessage } = useWebSocket('ws://localhost:8080/ws');
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/user/all', { withCredentials: true });
                setUsers(response.data.users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSendMessage = () => {
        const message = {
            SenderID: user.userId,
            ReceiverID: selectedUser,
            Content: messageContent,
        };
        sendMessage(message);
        setMessageContent('');
    };

    return (
        <div>
            <h2>Chat with Users</h2>
            <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
                <option value="">Select a user to chat with</option>
                {users.map((u) => (
                    <option key={u.userId} value={u.userId}>
                        {u.firstName} {u.lastName} ({u.role})
                    </option>
                ))}
            </select>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.SenderID === user.userId ? 'You' : 'User'}:</strong> {msg.Content}
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

export default CoachChatPage;
