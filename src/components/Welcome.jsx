import React from 'react';

export default function Welcome({ username, onBackToCart }) {
  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <button onClick={onBackToCart}>Back to Cart</button>
    </div>
  );
}
