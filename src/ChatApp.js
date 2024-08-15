import React, { useState, useEffect } from 'react';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Fetch messages from db.json
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setMessages(data.messages))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { user: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user === 'You' ? 'sent' : 'received'}`}>
            <div className="message-content">
              <strong>{message.user}</strong>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;

