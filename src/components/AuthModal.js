import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/AuthModal.css";

const AuthModal = ({ closeModal }) => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // ✅ Email for registration
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors on new attempt

    if (isLogin) {
      await login(name, password, setError);
    } else {
      try {
        const response = await axios.post("http://localhost:8080/auth/register", {
          name,
          password,
          email, // ✅ Send email for registration
        });

        if (response.status === 200) {
          alert("✅ Registration successful! Please log in.");
          setIsLogin(true); // ✅ Switch to login after success
        }
      } catch (error) {
        setError("❌ Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </button>
        </p>

        <button className="close-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AuthModal;
