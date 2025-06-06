import React, { useState, useEffect } from "react";
import Register from "./Register";
import Welcome from "./Welcome";
import axios from "axios";

export default function Login({ onLogin, backToCartAvailable = false, onBackToCart }) {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);

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

      // Fetch order history after login
      try {
        const ordersRes = await axios.get(`https://node-apps-gagan.vercel.app/orders/${email}`);
        setOrders(ordersRes.data || []);
      } catch {
        setOrders([]);
      }

      onLogin(userData);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  if (showRegister)
    return <Register goToLogin={() => setShowRegister(false)} />;

  if (username && !backToCartAvailable)
    return <Welcome username={username} orders={orders} />;

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
          Back to Home Page
        </button>
      )}
    </div>
  );
}
