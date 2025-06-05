import React, { useState } from "react";
import Register from "./Register";
import Welcome from "./Welcome";
import axios from "axios";

export default function Login({ onLogin, backToCartAvailable = false, onBackToCart }) {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState(""); // password field is 'pass'
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !pass) {
      alert("Email and password are required.");
      return;
    }

    try {
      const res = await axios.post("https://node-apps-gagan.vercel.app/auth/login", {
        email,
        pass,
      });

      const userData = res.data.user;
      if (!userData) {
        setError("Invalid email or password");
        return;
      }
      setUsername(userData.username);
      setError("");
      onLogin(userData); // pass user data to parent (App.jsx)
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  if (showRegister)
    return <Register goToLogin={() => setShowRegister(false)} />;

  if (username && !backToCartAvailable) return <Welcome username={username} />;

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        required
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <button onClick={() => setShowRegister(true)}>Create Account</button>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}

      {backToCartAvailable && (
        <button onClick={onBackToCart} style={{ marginTop: "10px" }}>
          Back to Cart
        </button>
      )}
    </div>
  );
}
