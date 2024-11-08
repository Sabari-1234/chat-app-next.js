'use client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL||'');

const App = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('message2', (msg) => {
            setMessages((prevMessages: any) => [...prevMessages, msg]);
            console.log(messages)
        });

        // Cleanup on component unmount
        return () => {
            socket.off('message2');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            // Emit the message to the server
            socket.emit('message1', message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Socket.IO with Next.js</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <ul>
                {messages.map((msg: any, index: any) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
