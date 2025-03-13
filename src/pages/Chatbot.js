import React, { useState } from "react";
import axios from "axios";
import LabelDropdown from "../components/LabelDropdown";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    const labelData = selectedLabel ? { uuid: selectedLabel.uuid, name: selectedLabel.name } : null;

    try {
      const response = await axios.post("http://localhost:8080/api/chat", {
        fastApiRequest: { message: input },
        label: labelData,
      }, { withCredentials: true });

      const botMessage = { text: response.data.response, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("❌ Failed to fetch chatbot response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* 📝 Chat Box */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-message bot">Typing...</div>}
      </div>

      {/* ✍ Chat Input */}
      <div className="chat-input-container">
        <LabelDropdown selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel} />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">➤</button>
      </div>
    </div>
  );
};

export default Chatbot;
