import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./ChatBox.css";

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyAmxiUIC0pzhqxmW8Y_f9LbB-NEBzqcftg");

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your student marketplace assistant." }
  ]);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // ✅ Correct model
        const chatSession = await model.startChat(); // ✅ Correct method
        setChat(chatSession);
      } catch (error) {
        console.error("Failed to start chat:", error);
      }
    };
    initChat();
  }, []);

  const toggleChat = () => setIsOpen(prev => !prev);

  const sendMessage = async () => {
    if (!input.trim() || !chat) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const result = await chat.sendMessage(input);
      const response = await result.response;
      const botReply = response.text();
      setMessages(prev => [...prev, { from: "bot", text: botReply }]);
    } catch (error) {
      console.error("Send message error:", error);
      setMessages(prev => [...prev, { from: "bot", text: "Error from AI response." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={`chatbox-container ${isOpen ? "open" : ""}`}>
      <button className="chatbox-toggle" onClick={toggleChat}>
        {isOpen ? "✖" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="message bot">Typing...</div>}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
