// Chatbot.jsx
import React, { useState } from "react";
import { checkProductAvailability } from "./ProductChecker"; // ✅ CORRECT import

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    const botReply = checkProductAvailability(userMessage); // ✅ Use the function
    setMessages((prev) => [
      ...prev,
      { from: "user", text: userMessage },
      { from: "bot", text: botReply },
    ]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === "user" ? "message user" : "message bot"}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a product..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
