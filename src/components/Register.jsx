import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ goToLogin }) {
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleRegister = async () => {
    if (pass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    if (!email || !pass) {
      alert("Email and password are required.");
      return;
    }

    try {
      await axios.post('https://node-apps-gagan.vercel.app/auth/register', {
        name,
        email,
        phone,
        country,
        pass,   // use pass here
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
      <input
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="tel"
        placeholder="Phone Number (optional)"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      /><br />
      <select value={country} onChange={e => setCountry(e.target.value)}>
        <option value="">Select Country (optional)</option>
        <option value="IN">India</option>
        <option value="US">USA</option>
        <option value="UK">UK</option>
      </select><br />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={e => setPass(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPass}
        onChange={e => setConfirmPass(e.target.value)}
        required
      /><br />
      <button onClick={handleRegister}>Register</button>

      <p
        style={{ marginTop: '1rem', cursor: 'pointer', color: '#ff6f61' }}
        onClick={goToLogin}
      >
        Already have an account? Login
      </p>
    </div>
  );
}
