import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Message {
    senderId: number;
    receiverId: number;
    content: string;
    createdAt: string;
}

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

interface ChatContextType {
    messages: Message[];
    users: User[];
    fetchUsers: () => Promise<void>;
    sendMessage: (message: Omit<Message, 'createdAt'>) => Promise<void>;
    loadMessages: (userId1: number, userId2: number) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const sendMessage = async (message: Omit<Message, 'createdAt'>) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/messages/send', message, {
                withCredentials: true,
            });
            setMessages((prevMessages) => [...prevMessages, response.data]);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const loadMessages = async (userId1: number, userId2: number) => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/messages/list', {
                params: { userID1: userId1, userID2: userId2 },
                withCredentials: true,
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Failed to load messages:', error);
        }
    };

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/user/all', {
                withCredentials: true,
            });
            setUsers(response.data.users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <ChatContext.Provider value={{ messages, users, fetchUsers, sendMessage, loadMessages }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
