import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Ensure it matches your backend

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { text: message });
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;
