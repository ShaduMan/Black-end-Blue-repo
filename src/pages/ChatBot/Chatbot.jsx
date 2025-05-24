import React, { useState } from "react";
import { checkProductAvailability } from "./ProductChecker";
import "./Chatbot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    const botReply = {
      sender: "bot",
      text: checkProductAvailability(userInput),
    };

    setMessages([...messages, userMessage, botReply]);
    setUserInput("");
  };

  return (
    <div className="chatbot-container">
      <h2>AI Product Assistant</h2>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Ask about a product..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
