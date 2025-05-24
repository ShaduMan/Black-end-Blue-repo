import React, { useState } from "react";
import axios from "axios";
import "./ChatBox.css";

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
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemini-2.5-flash-preview", // Valid model name
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            ...messages.map((m) => ({
              role: m.from === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // Note Bearer prefix
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "StudentMarketplace",
          },
        }
      );

      const botReply = response.data.choices[0].message.content;

      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (error) {
      console.error("OpenRouter API error:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className={`chatbox-container ${isOpen ? "open" : ""}`}>
      <button className="chatbox-toggle" onClick={toggleChat}>
        {isOpen ? "✖" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbox-message ${msg.from === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbox-message bot">Typing...</div>}
          </div>

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
      )}
    </div>
  );
};

export default ChatBox;
