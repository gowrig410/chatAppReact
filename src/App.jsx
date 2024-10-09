// App.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { addMessage } from './redux/chatSlice';
import Chat from './components/Chat';
import './App.css'; // Single CSS file for all styles

const socket = io('http://localhost:4000'); // Connect to the server

const App = () => {
  const [inputUser1, setInputUser1] = useState(''); // State for User 1's input
  const [inputUser2, setInputUser2] = useState(''); // State for User 2's input
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (message) => {
      dispatch(addMessage(message)); // Dispatch received message
    });

    return () => {
      socket.off('message');
    };
  }, [dispatch]);

  const sendMessage = (sender, input) => {
    if (input.trim()) {
      const message = { text: input, sender }; // Create message object
      socket.emit('message', message); // Send message with sender info
      if (sender === 'User 1') {
        setInputUser1(''); // Clear User 1's input
      } else {
        setInputUser2(''); // Clear User 2's input
      }
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Quick Chat</h1>
      <div className="chat-card">
        <Chat messages={messages} />
        <div className="input-container">
          <div className="user1-field">
            <input 
              type="text" 
              className="message-input"
              value={inputUser1} 
              onChange={(e) => setInputUser1(e.target.value)} 
              placeholder="User 1: Type a message..." 
            />
            <button className="send-button" onClick={() => sendMessage('User 1', inputUser1)}>Send</button>
          </div>
          <div className="user2-field">
            <input 
              type="text" 
              className="message-input"
              value={inputUser2} 
              onChange={(e) => setInputUser2(e.target.value)} 
              placeholder="User 2: Type a message..." 
            />
            <button className="send-button" onClick={() => sendMessage('User 2', inputUser2)}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
