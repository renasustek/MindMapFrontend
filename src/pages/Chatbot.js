import React, { useState } from "react";
import axios from "axios";
import LabelDropdown from "../components/LabelDropdown";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(null); // ✅ Store full label object
  const [loading, setLoading] = useState(false); // Show loading indicator

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Prevent empty messages

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    
    setInput(""); // Clear input field
    setLoading(true);

    // ✅ If no label is selected, send `null` for label
    const labelData = selectedLabel ? { uuid: selectedLabel.uuid, name: selectedLabel.name } : null;

    
    try {
      const response = await axios.post("http://localhost:8080/api/chat", {
        fastApiRequest: { message: input },
        label: labelData, // ✅ Use full label object
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
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-message bot">Typing...</div>}
      </div>

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
