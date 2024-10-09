import React from 'react';

const Chat = ({ messages }) => {
  return (
    <div className="chat-container">
      <div className="user1-container">
        {messages.map((message, index) => (
          <div
            className={`chat-message ${message.sender === 'User 1' ? 'user1' : 'user2'}`}
            key={index}
            style={{
              alignSelf: message.sender === 'User 1' ? 'flex-end' : 'flex-start', // Align User 1's messages to the right
            }}
          >
            <span className="message-sender">{message.sender}:</span> {message.text}
          </div>
        ))}
      </div>
      <div className="user2-container">
        {messages.map((message, index) => (
          <div
            className={`chat-message ${message.sender === 'User 2' ? 'user2' : 'user1'}`}
            key={index}
            style={{
              alignSelf: message.sender === 'User 2' ? 'flex-end' : 'flex-start', // Align User 2's messages to the right
            }}
          >
            <span className="message-sender">{message.sender}:</span> {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
