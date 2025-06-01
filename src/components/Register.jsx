import React from 'react';

export default function Register() {
  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Name (optional)" /><br />
      <input type="email" placeholder="Email" required /><br />
      <input type="tel" placeholder="Phone Number" /><br />
      <select>
        <option value="">Select Country (optional)</option>
        <option value="IN">India</option>
        <option value="US">USA</option>
        <option value="UK">UK</option>
      </select><br />
      <input type="password" placeholder="Password" required /><br />
      <input type="password" placeholder="Confirm Password" required /><br />
      <button>Register</button>
    </div>
  );
}