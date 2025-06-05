import React from "react";
import { Link } from "react-router-dom";

export default function Welcome({ user }) {
  return (
    <div>
      <h2>Welcome, {user?.username || "User"}!</h2>
      <Link to="/cart">Back to Cart</Link> | <Link to="/orders">Order History</Link>
    </div>
  );
}
