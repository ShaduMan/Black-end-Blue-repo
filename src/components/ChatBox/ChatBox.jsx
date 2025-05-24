import React, { useState } from "react";
import axios from "axios";
import "./ChatBox.css"; // Make sure this CSS file exists

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Ask me anything." }
  ]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemini-2.5-flash-preview",
          messages: [
            { role: "system", content: "You are a helpful assistant for a student marketplace website." },
            ...updatedMessages.map((msg) => ({
              role: msg.from === "user" ? "user" : "assistant",
              content: msg.text
            }))
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `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`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "StudentMarketplace"
          }
        }
      );

      const botReply = response.data.choices?.[0]?.message?.content || "No response from AI.";
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (error) {
      console.error("API error:", error);
      setMessages((prev) => [...prev, { from: "bot", text: "Something went wrong." }]);
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
              <div
                key={idx}
                className={`chatbox-message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbox-message bot">Typing...</div>}
          </div>

          <div className="chatbox-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
