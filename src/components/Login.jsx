import React, { useState } from 'react';
import Register from './Register';
import Welcome from './Welcome';
import axios from 'axios';

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await axios.post('https://node-apps-gagan.vercel.app/auth/login', {
        email,
        pass: password,  // must be pass (backend expects this)
      });
      setUsername(res.data.user?.username || '');
      setLoggedIn(true);
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  if (showRegister) return <Register goToLogin={() => setShowRegister(false)} />;
  if (loggedIn) return <Welcome username={username} />;

  return (
    <div>
      <h2>Login</h2>
      <input id="email" type="email" placeholder="Email" required /><br />
      <input id="password" type="password" placeholder="Password" required /><br />
      <button onClick={handleSubmit}>Submit</button><br />
      <button onClick={() => setShowRegister(true)}>Create Account</button>
    </div>
  );
}
