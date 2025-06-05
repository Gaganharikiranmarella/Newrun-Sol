import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ goToLogin }) {
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm').value;

    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      await axios.post('https://node-apps-gagan.vercel.app/users/register', {
        name,
        email,
        phone,
        country,
        pass: password,  // changed here
      });
      setRegistered(true);
    } catch (err) {
      alert("Error registering user: " + (err.response?.data?.message || err.message));
    }
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
      <input id="name" type="text" placeholder="Name (optional)" /><br />
      <input id="reg-email" type="email" placeholder="Email" required /><br />
      <input id="phone" type="tel" placeholder="Phone Number (optional)" /><br />
      <select id="country">
        <option value="">Select Country (optional)</option>
        <option value="IN">India</option>
        <option value="US">USA</option>
        <option value="UK">UK</option>
      </select><br />
      <input id="password" type="password" placeholder="Password" required /><br />
      <input id="confirm" type="password" placeholder="Confirm Password" required /><br />
      <button onClick={handleRegister}>Register</button>

      <p style={{ marginTop: '1rem', cursor: 'pointer', color: '#ff6f61' }} onClick={goToLogin}>
        Already have an account? Login
      </p>
    </div>
  );
}
