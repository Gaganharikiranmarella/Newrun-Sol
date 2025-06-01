import React, { useState } from 'react';

export default function Register({ goToLogin }) {
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    // You can add validation here if needed
    setRegistered(true);
  };

  if (registered) {
    return (
      <div>
        <h2>Registration Successful</h2>
        <p>Thank you for registering!</p>
        <button onClick={goToLogin} style={{ marginTop: '1rem' }}>
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Name (optional)" /><br />
      <input type="email" placeholder="Email" required /><br />
      <input type="tel" placeholder="Phone Number (optional)" /><br />
      <select>
        <option value="">Select Country (optional)</option>
        <option value="IN">India</option>
        <option value="US">USA</option>
        <option value="UK">UK</option>
      </select><br />
      <input type="password" placeholder="Password" required /><br />
      <input type="password" placeholder="Confirm Password" required /><br />
      <button onClick={handleRegister}>Register</button>
      
      <p style={{ marginTop: '1rem', cursor: 'pointer', color: '#ff6f61' }} onClick={goToLogin}>
        Already have an account? Login
      </p>
    </div>
  );
}
