import React, { useState } from 'react';
import Register from './Register';
import Welcome from './Welcome';

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  if (showRegister) return <Register goToLogin={() => setShowRegister(false)} />;
  if (loggedIn) return <Welcome username={username} />;

  const handleSubmit = () => {
    const input = document.getElementById('email').value;
    const name = input.split('@')[0];
    setUsername(name);
    setLoggedIn(true);
  };

  return (
    <div>
      <h2>Login</h2>
      <input id="email" type="email" placeholder="Email" required /><br />
      <input type="password" placeholder="Password" required /><br />
      <button onClick={handleSubmit}>Submit</button><br />
      <button onClick={() => setShowRegister(true)}>Create Account</button>
    </div>
  );
}
