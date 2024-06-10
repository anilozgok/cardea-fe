import React, { useState, useEffect, useCallback } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText, Typography, Box, Autocomplete } from '@mui/material';
import { useChat } from '../context/ChatContext';
import axios from 'axios';

const ChatPage: React.FC = () => {
    const { messages, users, fetchUsers, sendMessage, loadMessages } = useChat();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchUsers();
        fetchCurrentUser();
    }, [fetchUsers]);

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/me', { withCredentials: true });
            setCurrentUser(response.data);
        } catch (error) {
            console.error('Failed to fetch current user:', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || selectedUserId === null) return;

        await sendMessage({
            senderId: currentUser.userId,
            receiverId: selectedUserId,
            content: newMessage,
        });
        setNewMessage('');
    };

    const handleUserChange = (event: any, newValue: any) => {
        if (newValue) {
            setSelectedUserId(newValue.userId);
            loadMessages(currentUser.userId, newValue.userId); // Load messages when a user is selected
        } else {
            setSelectedUserId(null);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Chat</Typography>
            <Autocomplete
                options={users}
                getOptionLabel={(option) => `${option.firstName} ${option.lastName} (${option.role})`}
                onChange={handleUserChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select a user to chat with"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />
            <List>
                {messages.map((message, index) => (
                    <ListItem key={index} style={{ textAlign: message.senderId === currentUser?.userId ? 'right' : 'left' }}>
                        <ListItemText primary={message.content} secondary={new Date(message.createdAt).toLocaleString()} />
                    </ListItem>
                ))}
            </List>
            <Box display="flex" mt={2}>
                <TextField
                    label="Type a message"
                    variant="outlined"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage}>Send</Button>
            </Box>
        </Container>
    );
};

export default ChatPage;
