import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart({ cart = {}, addToCart, user }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [isOrdering, setIsOrdering] = useState(false);
  const items = Object.values(cart);

  // Make sure user is fetched from localStorage correctly
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      try {
        const stored = JSON.parse(localStorage.getItem("user"));
        if (stored?.email) setCurrentUser(stored);
      } catch (err) {
        console.log("Invalid localStorage user");
      }
    }
  }, [user]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (isOrdering || !currentUser?.email) return;
    setIsOrdering(true);
    try {
      const formattedItems = items.map(({ name, price, quantity }) => ({
        name,
        price,
        qty: quantity,
      }));

      await axios.post("https://node-apps-gagan.vercel.app/api/orders", {
        email: currentUser.email,
        items: formattedItems,
        total: totalPrice,
      });

      alert("Order successful, Thank you!");
    } catch (err) {
      alert("Error placing order.");
    } finally {
      setIsOrdering(false);
    }
  };

  // 1. Show login message only if currentUser is not ready
  if (!currentUser?.email) {
    return (
      <div className="cart-container">
        <h2>Please Login</h2>
        <button onClick={() => navigate("/login")}>Login to proceed with order</button>
      </div>
    );
  }

  // 2. Empty cart check
  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Add some products from Home page.</p>
      </div>
    );
  }

  // 3. Main Cart UI
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.map((item) => (
        <div key={item._id || item.name} className="cart-item">
          <h3>{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <div className="cart-controls">
            <button
              onClick={() => addToCart(item, Math.max(item.quantity - 1, 1))}
              disabled={item.quantity === 1}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => addToCart(item, item.quantity + 1)}>+</button>
          </div>
          <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
      <button onClick={placeOrder} disabled={isOrdering}>
        {isOrdering ? "Ordering..." : "Order"}
      </button>
    </div>
  );
}
