import React, { useState } from 'react';
import Register from './Register';
import Welcome from './Welcome';
import axios from 'axios';

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');  // changed to pass

  const handleSubmit = async () => {
    if (!email || !pass) {
      alert("Email and password are required.");
      return;
    }

    try {
      const res = await axios.post('https://node-apps-gagan.vercel.app/auth/login', {
        email,
        pass,   // use pass here
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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={pass}
        onChange={e => setPass(e.target.value)}
        required
      /><br />
      <button onClick={handleSubmit}>Submit</button><br />
      <button onClick={() => setShowRegister(true)}>Create Account</button>
    </div>
  );
}
