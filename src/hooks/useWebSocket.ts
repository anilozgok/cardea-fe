// src/hooks/useWebSocket.ts
import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const socket = new WebSocket(url);
        setWs(socket);

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        return () => {
            socket.close();
        };
    }, [url]);

    const sendMessage = (message: any) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;
