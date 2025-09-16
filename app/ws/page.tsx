    'use client'
import { useState, useEffect } from 'react';
    import io from 'socket.io-client';

    const socket = io();

    export default function Chat() {
      const [message, setMessage] = useState('');
      const [messages, setMessages] = useState([]);

      useEffect(() => {
        socket.on('message', (msg) => {
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
        return () => {
          socket.off('message');
        };
      }, []);

      const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
      };

      return (
        <div>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      );
    }
